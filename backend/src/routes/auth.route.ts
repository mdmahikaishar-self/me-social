import { FastifyPluginOptions, FastifyInstance } from "fastify";
import {
  authUserHandler,
  loginHandler,
  logoutHandler,
  signupHandler,
} from "../controllers/auth.controller";

export default function authRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  server.post("/signup", {}, signupHandler(server));
  server.post("/login", {}, loginHandler(server));
  server.post("/logout", {}, logoutHandler(server));
  server.get(
    "/user",
    { preHandler: [server.authenticate] },
    authUserHandler(server)
  );

  done();
}
