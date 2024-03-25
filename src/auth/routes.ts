import { FastifyInstance } from "fastify";
import { signup, signin } from "./interface.js";
import { AuthUseCase } from "./usecase.js";
import { signinValidation } from "../validation/signin/schema.js";
import { signupValidation } from "../validation/signup/schema.js";
import { validatorCompiler } from "../validation/validator.js";

export async function authRoutes(fastify: FastifyInstance) {
  const authUseCase = new AuthUseCase();

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

}