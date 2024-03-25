import { FastifyReply, FastifyRequest } from "fastify";

export async function setRedirectUrl(req: FastifyRequest, reply: FastifyReply) {
    req.session.set('username', 'will');
};