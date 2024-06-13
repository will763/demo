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
            const { email, name, redirect_url } = await microsoftAuthUsecase.getUserdetails(code) ?? "";
            
            const params = new URLSearchParams({ name, email });
            const url = redirect_url + "?" + params.toString();
            
            reply.redirect(url);
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    })

}