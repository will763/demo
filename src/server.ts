import fastify, { FastifyInstance } from "fastify"
import rateLimit from "@fastify/rate-limit"
import fastifyCsrf from "@fastify/csrf-protection"
import helmet from '@fastify/helmet'
import compress from '@fastify/compress'
import { UserRoutes } from "./user/routes.js";
import { authRoutes } from "./auth/routes.js";
import cors from '@fastify/cors'
import { Authenticator } from "@fastify/passport";
import fastifySecureSession from "@fastify/secure-session";
import { OIDCStrategy } from "passport-azure-ad";
import { azureADConfig, callbackFunction } from "./auth/provide/microsoft/config.js";
import { ensureAuthenticated } from "./auth/middleware/ensureAuthenticated.js";
import dotenv from 'dotenv'
import { setRedirectUrl } from "./auth/middleware/setRedirectUrl.js";

dotenv.config()

export const app: FastifyInstance = fastify()

const port = Number(process.env.PORT) || 3000;

export const fastifyPassport = new Authenticator();

app.register(fastifyCsrf, { sessionPlugin: '@fastify/secure-session' })

await app.register(rateLimit, { global: true, max: 2, timeWindow: 1000 })

app.setNotFoundHandler({
  preHandler: app.rateLimit()
}, function (request, reply) {
  reply.code(404).send({ hello: 'world' })
})

app.register(fastifySecureSession, {
  key: Buffer.from(`${process.env.SECRET_KEY}`),
  cookie: {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite:'none',
    partitioned: true
  }
})

app.register(fastifyPassport.initialize())
app.register(fastifyPassport.secureSession())

fastifyPassport.use(new OIDCStrategy(azureADConfig, callbackFunction));

fastifyPassport.registerUserSerializer(async (user, request) => user);

fastifyPassport.registerUserDeserializer(async (user, request) => user);

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