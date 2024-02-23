import { FastifyInstance, FastifyRequest } from "fastify";
import { signup, signin } from "./interface.js";
import { AuthUseCase } from "./usecase.js";
import { app, fastifyPassport } from "../server.js";

export async function authRoutes(fastify: FastifyInstance) {
  const authUseCase = new AuthUseCase()

  fastify.post<{ Body: signin }>('/signin', async (req, reply) => {
    const { email, password } = req.body;

    try {
      await authUseCase.signin({ email, password }, req);
      reply.status(200);

    } catch (error) {
      reply.status(400).send(error);
    }

  });

  fastify.post<{ Body: signup }>('/signup', async (req, reply) => {
    const { email, password, name } = req.body

    try {
      await authUseCase.signup({ email, password, name });

    } catch (error) {
      reply.status(400).send(error);
    }

  });

  fastify.get('/microsoft', fastifyPassport.authenticate('azuread-openidconnect', { failureRedirect: '/api/v1/auth/auth-failure' }));

  fastify.post('/callback',
    { preValidation: fastifyPassport.authenticate('azuread-openidconnect', { failureRedirect: '/api/v1/auth/auth-failure' }) },
    (req, reply) => {
      reply.redirect(`${process.env.FRONTEND_URL}`)
    }
  )

  fastify.get('/logout', async (req: FastifyRequest, reply) => {
    try {
      await req.logOut();
      req.session.delete();
      if (req.session.deleted) {
        reply.redirect(`${process.env.FRONTEND_URL}`);
        return
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
    reply.status(401).send({ message: 'Authentication failed' });
  })
  
}