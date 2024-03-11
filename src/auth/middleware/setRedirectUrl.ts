import { FastifyReply, FastifyRequest } from "fastify";

export async function setRedirectUrl(req: FastifyRequest, reply: FastifyReply) {
    const query = req.query as { redirect_url?: string };
    const redirectUrl = query.redirect_url;

    if (!redirectUrl || typeof redirectUrl !== 'string') {
        reply.status(400).send('O parâmetro redirect_url é obrigatório e deve ser uma string.');
        return;
    }

    reply.setCookie('redirect_url_frontend', redirectUrl, {
        path:'/',
        httpOnly:true,
        secure:true,
        sameSite:'none',
        partitioned: true
    })
};