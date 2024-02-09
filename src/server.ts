import fastify, { FastifyInstance, FastifyRequest } from "fastify"
import cookie from '@fastify/cookie'
import { loginRoutes } from "./login/routes";
import { authRoutes } from "./auth/routes";
import { validAuthToken } from "./auth/middleware";
import cors from '@fastify/cors'

export const app: FastifyInstance = fastify()

app.register(cors, { 
  origin: 'http://localhost:5173',
  credentials: true
})

app.register(cookie, {
  hook: 'preHandler',
})

app.register(loginRoutes ,{
    prefix: '/api/v1/logins',
  });

app.register(authRoutes, {
    prefix: '/api/v1/auth',
  });

app.decorate(
  'authenticate',
  validAuthToken
)

app.get('/', async (req, reply) => {
  reply.send("hello world")
})

app.listen({
    port:3001,
    },
    ()=> {
    console.log("app is running on port 3001")
  })