import { FastifyInstance, FastifyRequest } from "fastify";
import { signup, signin } from "./interface";
import { AuthUseCase } from "./usecase";
import { MicrosoftAuthUseCase } from './provide/microsoft/usecase'

export async function authRoutes(fastify: FastifyInstance) {
    const authUseCase = new AuthUseCase()
    const microsoftAuthUseCase = new MicrosoftAuthUseCase()
    
    fastify.post<{ Body: signin }>('/signin', async (req, reply) => {
      const { email, password } = req.body;

      try {
        const token = await authUseCase.signin({ email, password });

        reply
          .status(200)
          .send({access_token:token})
        
      } catch (error) {
        reply.status(400).send(error);
      }
      
    });

    fastify.post<{ Body: signup }>('/signup', async (req, reply) => {
      const { email, password, name }  = req.body

      try {
        await authUseCase.signup({email, password, name});
        
      } catch (error) {
        reply.status(400).send(error);
      }
      
    });

    fastify.post<{Body:{username: string, password: string}}>('/microsoft', async (req, reply) => {
      try {
        const { username, password } = req.body;
        const response = await microsoftAuthUseCase.signin(username, password);
        reply.send(response)
      } catch (error) {
        reply.status(500).send("Erro ao efetuar login pela microsoft "+ error);
      }
    })

}