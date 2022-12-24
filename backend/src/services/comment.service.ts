import crypto from "crypto";
import { TComment, TCommentCreateBody } from "../schemas/comment.schema";
import { Comment, User } from "../models";

/**
 * createComment
 */
export async function createComment({
  body,
  userId,
  postId,
}: {
  body: TCommentCreateBody;
  userId: string;
  postId: string;
}) {
  const id = await crypto.randomUUID();
  const comment = await Comment.create({ ...body, id, userId, postId });
  return comment.toJSON() as TComment;
}

/**
 * deleteComment
 */
export async function deleteComment({
  userId,
  postId,
  commentId,
}: {
  userId: string;
  postId: string;
  commentId: string;
}) {
  const comment = await Comment.destroy({
    where: { id: commentId, userId, postId },
  });
  return Boolean(comment);
}

/**
 * getAllComments
 */
export async function getAllComments(postId: string) {
  const comments = await Comment.findAll({
    where: { postId },
    include: [{ model: User }],
  });

  return comments.map((comment) => comment.toJSON()) as TComment[];
}
