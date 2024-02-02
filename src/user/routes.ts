import { FastifyInstance } from "fastify";
import { UserCreate } from "./interface";
import { UserUseCase } from "./usecase";

export async function userRoutes(fastify: FastifyInstance) {
    const userUseCase = new UserUseCase()

    // POST
    fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {

      const{email, name, password} = req.body;
      try {
        await userUseCase.create({email, name, password});
        reply.status(200).send("Sucesso ao Criar Usuario")
        
      } catch (error) {
          reply.status(400).send({error: "Request Ruim"});
      }
    }
  );

    // GET
    fastify.get('/', async (req, reply) => {
      
    }
  );
}