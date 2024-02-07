import { FastifyInstance, FastifyRequest } from "fastify";
import { LoginCreate, LoginUpdate } from "./interface";
import { LoginUseCase } from "./usecase";

export async function loginRoutes(fastify: FastifyInstance) {
  const loginUseCase = new LoginUseCase()

  fastify.get('/', async (req, reply) => {
    try {
        const loginList = await loginUseCase.get();
        reply.status(200).send(loginList);
    } catch (error) {
        reply.status(500).send({ error: "Erro ao obter dados de login" });
    }
  });

  fastify.put<{ Params: { email: string }; Body: LoginUpdate }>('/:email',  
  async (req: FastifyRequest<{ Params: { email: string }; Body: LoginUpdate }>, reply) => {
    const email = req.params.email;
    const { password } = req.body;

    try {
      await loginUseCase.updatePassword(email, password);
      reply.status(200).send("Senha atualizada com sucesso");
    } catch (error) {
      reply.status(500).send({ error: "Erro ao atualizar senha" });
    }
  });

  fastify.delete<{ Params: { email: string } }>('/:email', async (req, reply) => {
    const email = req.params.email;

    try {
      await loginUseCase.delete(email);
      reply.status(200).send("Login deletado com sucesso");
    } catch (error) {
      reply.status(500).send({ error: "Erro ao deletar login" });
    }
  });

}
