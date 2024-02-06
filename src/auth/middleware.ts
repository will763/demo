import { FastifyReply, FastifyRequest } from "fastify"
import jwt from "jsonwebtoken"

export async function validAuthToken(req: FastifyRequest, reply: FastifyReply) {
    try {
      const token = req.cookies.access_token

      if (!token) {
        return reply.status(401).send({ message: 'Você não está autenticado' })
      }

      const verified = jwt.verify(token, process.env.JWT_SECRET as string);

      if (!verified){
       return reply.status(401).send({ message: 'Verificação do token falhou, autorização negada.'});
      }
        
    } catch (error) {
        reply.status(503).send({error: error})
    }

}