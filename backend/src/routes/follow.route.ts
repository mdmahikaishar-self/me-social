import { FastifyPluginOptions, FastifyInstance } from "fastify";
import {
  createFollowHandler,
  deleteFollowHandler,
  isFollowingHandler,
} from "../controllers/follow.controller";

export default function followRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  server.post("/", { preHandler: [server.authenticate] }, createFollowHandler);
  server.delete(
    "/",
    { preHandler: [server.authenticate] },
    deleteFollowHandler
  );
  server.get(
    "/following",
    { preHandler: [server.authenticate] },
    isFollowingHandler
  );

  done();
}
