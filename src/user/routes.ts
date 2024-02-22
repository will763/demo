import { FastifyInstance, FastifyRequest } from "fastify";
import { app } from "../server.js";
import { UserUseCase } from "./usecase.js";
import { UserUpdate } from "./interface.js";

export async function UserRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()

  fastify.get('/', { preHandler: [app.ensureAuthenticated] }, async (req, reply) => {
    try {
      const userList = await userUseCase.get();
      reply.status(200).send(userList);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao obter dados do usuário" });
    }
  });

  fastify.put<{ Params: { email: string }; Body: UserUpdate }>('/:email', { preHandler: [app.ensureAuthenticated] },
    async (req, reply) => {
      try {
        const email = req.params.email;
        const data = req.body;

        await userUseCase.update(email, data);
        reply.status(200).send("Senha atualizada com sucesso");
      } catch (error) {
        reply.status(500).send({ error: "Erro ao atualizar senha" });
      }
    });

  fastify.delete<{ Params: { email: string } }>('/:email', { preHandler: [app.ensureAuthenticated] },
    async (req, reply) => {
      try {
        const { email } = req.params;
        await userUseCase.delete(email);
        reply.status(200).send("Login deletado com sucesso");
      } catch (error) {
        reply.status(500).send({ error: "Erro ao deletar login" });
      }
    });

}