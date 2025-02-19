import fastify, { FastifyInstance } from "fastify"
import rateLimit from "@fastify/rate-limit"
import helmet from '@fastify/helmet'
import compress from '@fastify/compress'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { authRoutesMicrosoft } from "./auth/provide/microsoft/routes.js";

dotenv.config()

export const app: FastifyInstance = fastify()

const port = Number(process.env.PORT) || 3000;

await app.register(rateLimit, { global: true, max: 2, timeWindow: 1000 })

app.setNotFoundHandler({
  preHandler: app.rateLimit()
}, function (request, reply) {
  reply.code(404).send({ message: 'Servidor está rodando!' })
})

app.register(helmet, { global: true });

await app.register(compress);

app.register(cors, {
  origin: '*',
})

app.register(authRoutesMicrosoft, {
  prefix: '/api/v1/auth'
});

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