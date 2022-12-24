import { FastifyReply, FastifyRequest } from "fastify";
import logger from "../libs/logger";
import {
  PostsReplySchema,
  PostReplySchema,
  TPostCreateBody,
} from "../schemas/post.schema";
import {
  createPost,
  deletePost,
  getAllPosts,
  getAllUserPosts,
  getPost,
} from "../services/post.service";

/**
 * createPostHandler
 * ------------------
 * method: POST
 * body: TPostCreateBody
 */
export async function createPostHandler(
  request: FastifyRequest<{ Body: TPostCreateBody }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // create post
    const post = await createPost(request.body, auth.id);

    return reply.code(200).send({ message: "Post has been created." });
  } catch (error: any) {
    logger.error(error?.message, "Error: createPostHandler.");
    return reply.code(400).send({ message: "Error: createPostHandler." });
  }
}

/**
 * deletePostHandler
 * ------------------
 * method: DELETE
 * params: postId
 */
export async function deletePostHandler(
  request: FastifyRequest<{ Querystring: { postId: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // delete post
    const isDeleted = await deletePost({
      postId: request.query.postId,
      userId: auth.id,
    });

    return reply.code(200).send({ deleted: isDeleted });
  } catch (error: any) {
    logger.error(error?.message, "Error: deletePostHandler.");
    return reply.code(400).send({ message: "Error: deletePostHandler." });
  }
}

/**
 * getAllPostsHandler
 * ------------------
 * method: GET
 * query: userId?
 */
export async function getAllPostsHandler(
  request: FastifyRequest<{ Querystring: { userId?: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // query
    const userId = request.query.userId;

    // get all posts
    const posts = userId
      ? await getAllUserPosts(userId)
      : await getAllPosts(auth.id);

    return reply.code(200).send({
      posts: PostsReplySchema.parse(posts),
    });
  } catch (error: any) {
    logger.error(error?.message, "Error: getAllPostsHandler.");
    return reply.code(400).send({ message: "Error: getAllPostsHandler." });
  }
}

/**
 * getPostHandler
 * ------------------
 * method: GET
 * query: postId
 */
export async function getPostHandler(
  request: FastifyRequest<{ Querystring: { postId: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // get post
    const post = await getPost(request.query.postId, auth.id);

    return reply.code(200).send({ post: PostReplySchema.parse(post) });
  } catch (error: any) {
    logger.error(error?.message, "Error: getPostHandler.");
    return reply.code(400).send({ message: "Error: getPostHandler." });
  }
}
