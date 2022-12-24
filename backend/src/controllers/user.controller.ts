import { FastifyReply, FastifyRequest } from "fastify";
import logger from "../libs/logger";
import {
  TUpdateUserBody,
  UserLongReplySchema,
  UserReplySchema,
} from "../schemas/user.schema";
import { getUserById, updateUser } from "../services/user.service";

/**
 * getUserHandler
 * ------------------
 * method: GET
 * query: userId?
 */
export async function getUserHandler(
  request: FastifyRequest<{ Querystring: { userId?: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };
    const userId = request.query.userId;

    const user = await getUserById(userId || auth.id);

    return reply.code(200).send({
      user: UserReplySchema.parse(user),
    });
  } catch (error: any) {
    logger.error(error?.message, "Error: getUserHandler.");
    return reply.code(400).send({ message: "Error: getUserHandler." });
  }
}

/**
 * getLongUserHandler
 * ------------------
 * method: GET
 * query: userId?
 */
export async function getLongUserHandler(
  request: FastifyRequest<{ Querystring: { userId?: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };
    const userId = request.query.userId;

    const user = await getUserById(userId || auth.id);

    return reply.code(200).send({
      user: UserLongReplySchema.parse(user),
    });
  } catch (error: any) {
    logger.error(error?.message, "Error: getLongUserHandler.");
    return reply.code(400).send({ message: "Error: getLongUserHandler." });
  }
}

/**
 * updateUserHandler
 * ------------------
 * method: PUT
 * body: TUpdateUserBody
 */
export async function updateUserHandler(
  request: FastifyRequest<{ Body: TUpdateUserBody }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // update user infos
    await updateUser(auth.id, request.body);

    return reply.code(200).send({
      message: "Updated Successfully",
    });
  } catch (error: any) {
    logger.error(error?.message, "Error: updateUserHandler.");
    return reply.code(400).send({ message: "Error: updateUserHandler." });
  }
}
