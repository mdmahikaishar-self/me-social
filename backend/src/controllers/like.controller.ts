import { FastifyReply, FastifyRequest } from "fastify";
import logger from "../libs/logger";
import { LikeReplySchema, LikesReplySchema } from "../schemas/like.schema";
import { createLike, getAllLikes, removeLike } from "../services/like.service";

/**
 * createLikeHandler
 * ------------------
 * method: POST
 * query: postId
 */
export async function createLikeHandler(
  request: FastifyRequest<{ Querystring: { postId: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // create like
    const like = await createLike({
      postId: request.query.postId,
      userId: auth.id,
    });

    return reply
      .code(200)
      .send({
        like: LikeReplySchema.parse(like),
        message: "Post has been liked.",
      });
  } catch (error: any) {
    logger.error(error?.message, "Error: createLikeHandler.");
    return reply.code(400).send({ message: "Error: createLikeHandler." });
  }
}

/**
 * removeLikeHandler
 * -----------------
 * method: DELETE
 * query: postId
 */
export async function removeLikeHandler(
  request: FastifyRequest<{ Querystring: { postId: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // remove like
    const disliked = await removeLike({
      postId: request.query.postId,
      userId: auth.id,
    });

    return reply.code(200).send({ message: "Post has been disliked." });
  } catch (error: any) {
    logger.error(error?.message, "Error: removeLikeHandler.");
    return reply.code(400).send({ message: "Error: removeLikeHandler." });
  }
}

/**
 * getAllLikesHandler
 * -----------------
 * method: GET
 * query: postId
 */
export async function getAllLikesHandler(
  request: FastifyRequest<{ Querystring: { postId: string } }>,
  reply: FastifyReply
) {
  try {
    // get all likes
    const likes = await getAllLikes({
      postId: request.query.postId,
    });

    return reply.code(200).send({ likes: LikesReplySchema.parse(likes) });
  } catch (error: any) {
    logger.error(error?.message, "Error: getAllLikesHandler.");
    return reply.code(400).send({ message: "Error: getAllLikesHandler." });
  }
}
