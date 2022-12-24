import { FastifyPluginOptions, FastifyInstance } from "fastify";
import {
  createLikeHandler,
  removeLikeHandler,
  getAllLikesHandler,
} from "../controllers/like.controller";

export default function likeRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  server.post("/", { preHandler: [server.authenticate] }, createLikeHandler);
  server.delete("/", { preHandler: [server.authenticate] }, removeLikeHandler);
  server.get("/", { preHandler: [server.authenticate] }, getAllLikesHandler);

  done();
}
