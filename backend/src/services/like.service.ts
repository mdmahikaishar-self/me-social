import { Like } from "../models";
import crypto from "crypto";
import { TLike } from "../schemas/like.schema";

/**
 * createLike
 */
export async function createLike({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) {
  // exits
  const likeExits = await Like.findOne({ where: { postId, userId } });
  if (likeExits) return likeExits.toJSON() as TLike;

  // if not exits
  const id = await crypto.randomUUID();
  const like = await Like.create({ id, postId, userId });
  return like.toJSON() as TLike;
}

/**
 * removeLike
 */
export async function removeLike({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) {
  const disliked = await Like.destroy({ where: { postId, userId } });
  return Boolean(disliked);
}

/**
 * getAllLikes
 */
export async function getAllLikes({ postId }: { postId: string }) {
  const likes = await Like.findAll({ where: { postId } });
  return likes.map((like) => like.toJSON()) as TLike[];
}
