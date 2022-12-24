import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyMulter from "fastify-multer";
import fastifyJwt from "@fastify/jwt";
import registerRoutes from "../routes";
import logger from "./logger";

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
    upload: any;
  }
  export interface FastifyRequest {
    file: any;
  }
}

export default async function createServer() {
  const server = fastify();

  // middleware
  server.register(fastifyCors, {
    origin: "http://127.0.0.1:3000",
    credentials: true,
  });
  server.register(fastifyCookie, {});
  server.register(fastifyJwt, { secret: "It's our secret" });

  // logger
  server.addHook(
    "onRequest",
    (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      console.log(request.method.padEnd(6), request.url);
      done();
    }
  );

  // decorate
  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error: any) {
        reply
          .code(400)
          .send({ message: "Authenticate failed", error: error.message });
      }
    }
  );
  server.decorate(
    "upload",
    fastifyMulter({
      storage: fastifyMulter.diskStorage({
        destination: (req, file, callback) => callback(null, "../file-storage"),
        filename: (req, file, callback) =>
          callback(null, new Date().toISOString() + file.filename),
      }),
    })
  );

  // routes
  registerRoutes(server);

  return server;
}

export type CreateServer = Awaited<ReturnType<typeof createServer>>;
