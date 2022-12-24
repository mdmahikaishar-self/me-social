import { FastifyPluginOptions, FastifyInstance } from "fastify";
import {
  fileUpload,
  healthCheckHandler,
} from "../controllers/index.controller";

export default function indexRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  server.get("/health", healthCheckHandler);
  server.post(
    "/api/upload",
    { preHandler: [server.authenticate, server.upload.single("file")] },
    fileUpload
  );

  done();
}
