import { FastifyReply, FastifyRequest } from "fastify";

/**
 * healthCheckHandler
 * ------------------
 * method: GET
 */
export async function healthCheckHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.code(200).send("Server is okey :-)");
}

/**
 * fileUpload
 * ------------------
 * method: POST
 */
export async function fileUpload(request: FastifyRequest, reply: FastifyReply) {
  return reply.code(200).send({ file: request.file.filename || "" });
}
