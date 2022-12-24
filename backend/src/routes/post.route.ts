import { FastifyPluginOptions, FastifyInstance } from "fastify";
import {
  createPostHandler,
  deletePostHandler,
  getAllPostsHandler,
  getPostHandler,
} from "../controllers/post.controller";

export default function postRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  server.post("/", { preHandler: [server.authenticate] }, createPostHandler);
  server.delete("/", { preHandler: [server.authenticate] }, deletePostHandler);
  server.get("/all", { preHandler: [server.authenticate] }, getAllPostsHandler);
  server.get("/", { preHandler: [server.authenticate] }, getPostHandler);

  done();
}
