import { Like, Post, User, Comment, Follow } from "../models";
import crypto from "crypto";
import { TPostCreateBody, TPost } from "../schemas/post.schema";

/**
 * createPost
 */
export async function createPost(body: TPostCreateBody, userId: string) {
  const id = await crypto.randomUUID();
  const post = await Post.create({ ...body, id, userId });
  return post.toJSON() as TPost;
}

/**
 * deletePost
 */
export async function deletePost({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  const post = await Post.destroy({ where: { id: postId, userId } });
  return Boolean(post);
}

/**
 * getAllPosts
 */
export async function getAllPosts(userId: string) {
  const posts = await Post.findAll({
    where: {},
    include: [
      { model: User },
      { model: Like },
      { model: Comment, include: [{ model: User }] },
    ],
    order: [["createdAt", "DESC"]],
  });

  return posts.map((post) => post.toJSON()) as TPost[];
}

/**
 * getAllUserPosts
 */
export async function getAllUserPosts(userId: string) {
  const posts = await Post.findAll({
    where: { userId: userId },
    include: [
      { model: User },
      { model: Like },
      { model: Comment, include: [{ model: User }] },
    ],
    order: [["createdAt", "DESC"]],
  });

  return posts.map((post) => post.toJSON()) as TPost[];
}

/**
 * getPost
 */
export async function getPost(postId: string, userId: string) {
  const post = await Post.findOne({
    where: { id: postId },
    include: [
      { model: User },
      { model: Like },
      { model: Comment, include: [{ model: User }] },
    ],
  });

  return post?.toJSON() as TPost;
}
