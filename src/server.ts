import fastify, { FastifyInstance } from "fastify"
import { userRoutes } from "./user/routes";
import { authRoutes } from "./auth/routes";

const app: FastifyInstance = fastify()

app.register(userRoutes, {
    prefix: '/api/v1/users',
  });

app.register(authRoutes, {
    prefix: '/api/v1/auth',
  });

app.listen({
    port:3001,
    },
    ()=> {
    console.log("app is running on port 3001")
  })