import fastify, { FastifyInstance } from "fastify"
import { UserRoutes } from "./user/routes.js";
import { authRoutes } from "./auth/routes.js";
import cors from '@fastify/cors'
import { Authenticator } from "@fastify/passport";
import fastifySecureSession from "@fastify/secure-session";
import { OIDCStrategy } from "passport-azure-ad";
import { azureADConfig, callbackFunction } from "./auth/provide/microsoft/config.js";
import fastifyFormbody from '@fastify/formbody'
import { ensureAuthenticated } from "./auth/middleware/ensureAuthenticated.js";
import dotenv from 'dotenv'
dotenv.config()

export const app: FastifyInstance = fastify()

const port = Number(process.env.PORT) || 3000;

export const fastifyPassport = new Authenticator();

app.register(fastifySecureSession, {
  key: Buffer.from(`${process.env.SECRET_KEY}`),
  cookie: {
    path: '/',
    maxAge: 100000
  }
})

app.register(fastifyFormbody)
app.register(fastifyPassport.initialize())
app.register(fastifyPassport.secureSession())

fastifyPassport.use(new OIDCStrategy(azureADConfig, callbackFunction));

fastifyPassport.registerUserSerializer(async (user, request) => user);

fastifyPassport.registerUserDeserializer(async (user, request) => user);

app.register(cors, {
  origin: `${process.env.FRONTEND_URL}`,
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