import 'fastify';
import { FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {

    type Authenticate = (
        request: FastifyRequest,
        reply: FastifyReply
    ) => Promise<void>;

    interface FastifyInstance {
        authenticate: Authenticate;
    }
}