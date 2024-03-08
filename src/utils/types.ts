import 'fastify';

declare module 'fastify' {

    type Authenticate = (
        request: FastifyRequest,
        reply: FastifyReply
    ) => Promise<void>;

    interface FastifyInstance {
        ensureAuthenticated: Authenticate,
        setRedirectUrl: Authenticate
    }
}