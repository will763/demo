import { FastifyInstance } from "fastify";
import { signup, signin } from "./interface";
import { AuthUseCase } from "./usecase";

export async function authRoutes(fastify: FastifyInstance) {
    const authUseCase = new AuthUseCase()
    fastify.post<{ Body: signin }>('/signin', async (req, reply) => {
      
    });

    fastify.post<{ Body: signup }>('/signup', async (req, reply) => {
      
    });
  }