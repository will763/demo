import { FastifyInstance } from "fastify";
import { MicrosoftAuthUseCase } from "./usecase.js";

export async function authRoutesMicrosoft(fastify: FastifyInstance) {
    const microsoftAuthUsecase = new MicrosoftAuthUseCase();

    fastify.get<{ Querystring: { redirect_url: string } }>('/microsoft', async (request, reply) => {
        try {
            const { redirect_url } = request.query
            const loginUrl = await microsoftAuthUsecase.generateAuthUrl(redirect_url);

            reply.redirect(loginUrl);
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    });

    fastify.get<{ Querystring: { code: string } }>('/callback', async (req, reply) => {
        try {
            const { code } = req.query;
            const { user, redirect_url } = await microsoftAuthUsecase.getUserdetails(code) ?? "";

            const expireTime = new Date(Date.now() + 30000);
            reply.setCookie('sysmap-authentication', user, {
                path: '/',
                secure: false,
                httpOnly: false,
                expires: expireTime,
            });
            reply.redirect(redirect_url);
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    })

}