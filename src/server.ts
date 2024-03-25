import fastify, { FastifyInstance } from "fastify"
import rateLimit from "@fastify/rate-limit"
import helmet from '@fastify/helmet'
import compress from '@fastify/compress'
import { UserRoutes } from "./user/routes.js";
import { authRoutes } from "./auth/routes.js";
import cors from '@fastify/cors'
import { ensureAuthenticated } from "./auth/middleware/ensureAuthenticated.js";
import dotenv from 'dotenv'
import { setRedirectUrl } from "./auth/middleware/setRedirectUrl.js";
import { authRoutesMicrosoft } from "./auth/provide/microsoft/routes.js";

dotenv.config()

export const app: FastifyInstance = fastify()

const port = Number(process.env.PORT) || 3000;

app.register(import('@fastify/cookie'), {
  secret: Buffer.from(`${process.env.SECRET_KEY}`)
})

await app.register(rateLimit, { global: true, max: 2, timeWindow: 1000 })

app.setNotFoundHandler({
  preHandler: app.rateLimit()
}, function (request, reply) {
  reply.code(404).send({ hello: 'world' })
})

app.register(helmet, { global: true });

await app.register(compress);

app.register(cors, {
  origin: ['https://frontend-cyan-omega.vercel.app','http://localhost:3004'],
  credentials: true
})

app.register(UserRoutes, {
  prefix: '/api/v1/users',
});

app.register(authRoutes, {
  prefix: '/api/v1/auth',
});

app.register(authRoutesMicrosoft, {
  prefix: '/api/v1/auth',
});

app.decorate(
  'ensureAuthenticated',
  ensureAuthenticated
)

app.decorate(
  'setRedirectUrl',
  setRedirectUrl
)

app.get('/api', (req, reply) => {
  reply.send('Servidor está rodando!');
})

app.listen({ port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
})