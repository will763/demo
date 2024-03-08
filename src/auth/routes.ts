import { FastifyInstance, FastifyRequest } from "fastify";
import { signup, signin } from "./interface.js";
import { AuthUseCase } from "./usecase.js";
import { app, fastifyPassport } from "../server.js";
import { signinValidation } from "../validation/signin/schema.js";
import { signupValidation } from "../validation/signup/schema.js";
import { validatorCompiler } from "../validation/validator.js";

export async function authRoutes(fastify: FastifyInstance) {
  const authUseCase = new AuthUseCase()

  fastify.post<{ Body: signin }>('/signin', {
    schema: signinValidation.schema,
    validatorCompiler: validatorCompiler
  }, async (req, reply) => {
    try {
      const { email, password } = req.body;
      await authUseCase.signin({ email, password }, req);
      reply.status(200);
    } catch (error) {
      reply.status(500).send(error);
    }

  });

  fastify.post<{ Body: signup }>('/signup', {
    schema: signupValidation.schema,
    validatorCompiler: validatorCompiler
  }, async (req, reply) => {
    try {
      const { email, password, name } = req.body
      await authUseCase.signup({ email, password, name });
    } catch (error) {
      reply.status(400).send(error)
    }

  });

  fastify.get('/microsoft', { preHandler: [app.setRedirectUrl] },
    fastifyPassport.authenticate('azuread-openidconnect', { failureRedirect: '/api/v1/auth/auth-failure' }
    ));

  fastify.get('/callback',
    { preValidation: fastifyPassport.authenticate('azuread-openidconnect', { failureRedirect: '/api/v1/auth/auth-failure' }) },
    (req, reply) => {

      const { redirect_url_frontend } = req.cookies

      if (!redirect_url_frontend) {
        reply.code(400).send({ error: 'O cookie redirect_url_frontend está ausente' })
        return;
      }

      reply.redirect(redirect_url_frontend)
    }
  )

  fastify.get('/logout', { preHandler: [app.ensureAuthenticated] }, async (req: FastifyRequest, reply) => {
    try {
      const { redirect_url_frontend } = req.cookies

      if (redirect_url_frontend) {
        await req.logOut();
        req.session.delete();
        if (req.session.deleted) {
          reply.redirect(redirect_url_frontend)
          return
        }
      }

      reply.status(500).send('Erro ao tentar sair!')
    } catch (error) {
      reply.status(500).send('Erro ao tentar sair!')
    }
  });

  fastify.get('/account', { preHandler: [app.ensureAuthenticated] }, async (req, reply) => {
    reply.send(req.user);
  });

  fastify.get('/auth-failure', async (req, reply) => {
    reply.code(500).send('Erro ao efetuar o login');
  })

}