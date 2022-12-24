import { FastifyPluginOptions, FastifyInstance } from "fastify";
import {
  getLongUserHandler,
  getUserHandler,
  updateUserHandler,
} from "../controllers/user.controller";

export default function userRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  server.get("/", { preHandler: [server.authenticate] }, getUserHandler);
  server.get(
    "/long",
    { preHandler: [server.authenticate] },
    getLongUserHandler
  );
  server.put("/", { preHandler: [server.authenticate] }, updateUserHandler);

  done();
}
