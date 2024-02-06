import fastify, { FastifyInstance } from "fastify"
import cookie from '@fastify/cookie'
import { userRoutes } from "./user/routes";
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

app.register(userRoutes, {
    prefix: '/api/v1/users',
  });

app.register(authRoutes, {
    prefix: '/api/v1/auth',
  });

app.get('/',(req,reply) => {
  reply.send("helllo")
})

app.decorate(
  'authenticate',
  validAuthToken
)

app.listen({
    port:3001,
    },
    ()=> {
    console.log("app is running on port 3001")
  })