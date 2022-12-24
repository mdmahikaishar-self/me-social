import { FastifyReply, FastifyRequest } from "fastify";
import logger from "../libs/logger";
import {
  createFollow,
  deleteFollow,
  isFollowing,
} from "../services/follow.service";

/**
 * createFollowHandler
 * ------------------
 * method: POST
 * query: followedUserId
 */
export async function createFollowHandler(
  request: FastifyRequest<{ Querystring: { followedUserId: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };
    const { followedUserId } = request.query;

    // create follow
    const follow = await createFollow({
      followedUserId,
      followerUserId: auth.id,
    });

    return reply.code(200).send({ message: "User has been followed." });
  } catch (error: any) {
    logger.error(error?.message, "Error: createFollowHandler.");
    return reply.code(400).send({ message: "Error: createFollowHandler." });
  }
}

/**
 * deleteFollowHandler
 * ------------------
 * method: DELETE
 * params: followedUserId
 */
export async function deleteFollowHandler(
  request: FastifyRequest<{ Querystring: { followedUserId: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };
    const { followedUserId } = request.query;

    // delete follow
    const isDeleted = await deleteFollow({
      followedUserId,
      followerUserId: auth.id,
    });

    return reply.code(200).send({ deleted: isDeleted });
  } catch (error: any) {
    logger.error(error?.message, "Error: deleteFollowHandler.");
    return reply.code(400).send({ message: "Error: deleteFollowHandler." });
  }
}

/**
 * isFollowing
 * ------------------
 * method: GET
 * query: followedUserId
 */
export async function isFollowingHandler(
  request: FastifyRequest<{ Querystring: { followedUserId: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };
    const { followedUserId } = request.query;

    // is following
    const following = await isFollowing({
      followedUserId,
      followerUserId: auth.id,
    });

    return reply.code(200).send({ following });
  } catch (error: any) {
    logger.error(error?.message, "Error: isFollowingHandler.");
    return reply.code(400).send({ message: "Error: isFollowingHandler." });
  }
}
