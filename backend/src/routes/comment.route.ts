import { FastifyPluginOptions, FastifyInstance } from "fastify";
import {
  createCommentHandler,
  deleteCommentHandler,
  getAllCommentsHandler,
} from "../controllers/comment.controller";

export default function commentRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  server.post("/", { preHandler: [server.authenticate] }, createCommentHandler);
  server.delete(
    "/",
    { preHandler: [server.authenticate] },
    deleteCommentHandler
  );
  server.get("/", { preHandler: [server.authenticate] }, getAllCommentsHandler);

  done();
}
