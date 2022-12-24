import { FastifyReply, FastifyRequest } from "fastify";
import logger from "../libs/logger";
import {
  CommentsReplySchema,
  TCommentCreateBody,
} from "../schemas/comment.schema";
import {
  createComment,
  deleteComment,
  getAllComments,
} from "../services/comment.service";

/**
 * createCommentHandler
 * ------------------
 * method: POST
 * query: postId
 * body: TCommentCreateBody
 */
export async function createCommentHandler(
  request: FastifyRequest<{
    Body: TCommentCreateBody;
    Querystring: { postId: string };
  }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // create post
    const comment = await createComment({
      body: request.body,
      userId: auth.id,
      postId: request.query.postId,
    });

    return reply.code(200).send({ message: "Comment has been created." });
  } catch (error: any) {
    logger.error(error?.message, "Error: createCommentHandler.");
    return reply.code(400).send({ message: "Error: createCommentHandler." });
  }
}

/**
 * deleteCommentHandler
 * ------------------
 * method: DELETE
 * params: postId
 */
export async function deleteCommentHandler(
  request: FastifyRequest<{
    Querystring: { postId: string; commentId: string };
  }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // delete comment
    const isDeleted = await deleteComment({
      postId: request.query.postId,
      userId: auth.id,
      commentId: request.query.commentId,
    });

    return reply.code(200).send({ deleted: isDeleted });
  } catch (error: any) {
    logger.error(error?.message, "Error: deleteCommentHandler.");
    return reply.code(400).send({ message: "Error: deleteCommentHandler." });
  }
}

/**
 * getAllCommentsHandler
 * ------------------
 * method: GET
 */
export async function getAllCommentsHandler(
  request: FastifyRequest<{ Querystring: { postId: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // get all comments
    const comments = await getAllComments(request.query.postId);

    return reply.code(200).send({
      comments: CommentsReplySchema.parse(comments),
    });
  } catch (error: any) {
    logger.error(error?.message, "Error: getAllCommentsHandler.");
    return reply.code(400).send({ message: "Error: getAllCommentsHandler." });
  }
}
