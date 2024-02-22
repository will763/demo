import { FastifyReply, FastifyRequest } from "fastify";

export async function ensureAuthenticated(req: FastifyRequest, res: FastifyReply){
    if (!req.isAuthenticated()) {
      res.status(401).send('Você não está autenticado');
    }
  };