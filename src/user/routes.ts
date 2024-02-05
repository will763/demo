import { FastifyInstance, FastifyRequest } from "fastify";
import { UserCreate, UserUpdate } from "./interface";
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
    try {
        const users = await userUseCase.get();
        reply.status(200).send(users);
    } catch (error) {
        reply.status(500).send({ error: "Erro ao obter usuários" });
    }
  });

  // PUT
  fastify.put<{ Params: { email: string }; Body: UserUpdate }>('/:email',  
  async (req: FastifyRequest<{ Params: { email: string }; Body: UserUpdate }>, reply) => {
    const email = req.params.email;
    const { password } = req.body;

    try {
      await userUseCase.updatePassword(email, password);
      reply.status(200).send("Senha atualizada com sucesso");
    } catch (error) {
      reply.status(500).send({ error: "Erro ao atualizar senha" });
    }
  });

  // DELETE
  fastify.delete<{ Params: { email: string } }>('/:email', async (req, reply) => {
    const email = req.params.email;

    try {
      await userUseCase.delete(email);
      reply.status(200).send("Usuário deletado com sucesso");
    } catch (error) {
      reply.status(500).send({ error: "Erro ao deletar usuário" });
    }
  });

}
