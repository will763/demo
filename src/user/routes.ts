import { FastifyInstance, FastifyRequest } from "fastify";
import { app } from "../server.js";
import { UserUseCase } from "./usecase.js";
import { UserUpdate } from "./interface.js";
import { deleteUserValidation } from "../validation/deleteUser/schema.js";
import { validatorCompiler } from "../validation/validator.js";
import { updateUserValidation } from "../validation/updateUser/schema.js";

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

  fastify.put<{ Params: { id: number }; Body: UserUpdate }>('/:id', {
    schema: updateUserValidation.schema,
    validatorCompiler: validatorCompiler,
    preHandler: [app.ensureAuthenticated]
  },
    async (req, reply) => {
      try {
        const { id } = req.params;
        const data = req.body;

        await userUseCase.update(id, data);
        reply.status(201).send("Senha atualizada com sucesso");
      } catch (error) {
        reply.status(500).send({ error: "Erro ao atualizar senha" });
      }
    });

  fastify.delete<{ Params: { id: number } }>('/:id', {
    schema: deleteUserValidation.schema,
    validatorCompiler: validatorCompiler,
    preHandler: [app.ensureAuthenticated]
  },
    async (req, reply) => {
      try {
        const { id } = req.params;
        await userUseCase.delete(id);
        reply.status(200).send("Login deletado com sucesso");
      } catch (error) {
        reply.status(500).send({ error: "Erro ao deletar login" });
      }
    });

}