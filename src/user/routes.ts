import { FastifyInstance } from "fastify";
import { UserCreate } from "./interface";
import { UserUseCase } from "./usecase";

export async function userRoutes(fastify: FastifyInstance) {
    const userUseCase = new UserUseCase()
    fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {
      
    });

    fastify.get('/', (req, reply) => {
      reply.send({ hello: 'world' });
    });
  }