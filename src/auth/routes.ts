import { FastifyInstance } from "fastify";
import { signup, signin } from "./interface";
import { AuthUseCase } from "./usecase";
import { app } from "../server";

export async function authRoutes(fastify: FastifyInstance) {
    const authUseCase = new AuthUseCase()
    
    fastify.post<{ Body: signin }>('/signin', async (req, reply) => {
      const { email, password } = req.body;

      try {
        const token = await authUseCase.signin({ email, password });

        reply
          .status(200)
          .send({access_token:token})
        
      } catch (error) {
        reply.status(400).send("Error ao tentar realizar o login:  " + error);
      }
      
    });

    fastify.post<{ Body: signup }>('/signup', async (req, reply) => {
      const { email, password, name }  = req.body

      try {
        await authUseCase.signup({email, password, name});
        
      } catch (error) {
        reply.status(400).send("Error ao tentar criar usuário");
      }
      
    });

    fastify.get('/logout', { preHandler: [app.authenticate] } , async (req, reply) => {
      reply.send("testando")
    })

  }