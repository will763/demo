import { FastifyReply, FastifyRequest } from "fastify";

export async function setRedirectUrl(req: FastifyRequest, reply: FastifyReply) {
    const redirectUrl = req.headers.referer ?? 'http://localhost:3000/api'

    reply.setCookie('redirect_url_frontend', redirectUrl, {
        path:'/',
        httpOnly:true,
        sameSite:"strict"
    })
};