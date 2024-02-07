import { FastifyReply, FastifyRequest } from "fastify"
import jwt from "jsonwebtoken"

export async function validAuthToken(req: FastifyRequest, reply: FastifyReply) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return reply.status(401).send({ message: 'Você não está autenticado' })
      }

      const [bearer, token] = authHeader.split(' ');

      if (bearer != "Bearer") {
        return reply.status(401).send({ message: 'Verificação do token falhou, token mal formatado' })
      }
     
      const verified = jwt.verify(token, process.env.JWT_SECRET as string);
            
    } catch (error) {
        reply.status(503).send({"Verificação do token falhou": error})
    }

}