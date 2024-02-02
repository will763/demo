import { FastifyInstance } from "fastify";
import { Login } from "./interface";
import { AuthUseCase } from "./usecase";

export async function authRoutes(fastify: FastifyInstance) {
    const authUseCase = new AuthUseCase()
    fastify.post<{ Body: Login }>('/', async (req, reply) => {
      
    });
  }