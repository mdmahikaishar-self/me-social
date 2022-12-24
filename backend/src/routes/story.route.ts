import { FastifyPluginOptions, FastifyInstance } from "fastify";
import {
  createStoryHandler,
  deleteStoryHandler,
  getAllStoriesHandler,
  getStoryHandler,
} from "../controllers/story.controller";

export default function storyRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  server.post("/", { preHandler: [server.authenticate] }, createStoryHandler);
  server.delete("/", { preHandler: [server.authenticate] }, deleteStoryHandler);
  server.get(
    "/all",
    { preHandler: [server.authenticate] },
    getAllStoriesHandler
  );
  server.get("/", { preHandler: [server.authenticate] }, getStoryHandler);

  done();
}
