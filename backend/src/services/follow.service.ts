import { Follow, User } from "../models";
import crypto from "crypto";
import { TFollow } from "../schemas/follow.schema";

/**
 * createFollow
 */
export async function createFollow({
  followedUserId,
  followerUserId,
}: {
  followedUserId: string;
  followerUserId: string;
}) {
  const followExists = await Follow.findOne({
    where: { followedUserId, followerUserId },
  });
  if (followExists) return followExists;

  const id = crypto.randomUUID();
  const follow = await Follow.create({ followedUserId, followerUserId, id });
  return follow.toJSON() as TFollow;
}

/**
 * deleteFollow
 */
export async function deleteFollow({
  followedUserId,
  followerUserId,
}: {
  followedUserId: string;
  followerUserId: string;
}) {
  const follow = await Follow.destroy({
    where: { followedUserId, followerUserId },
  });
  return Boolean(follow);
}

/**
 * getAllFollows
 */
export async function getAllFollows(followerUserId: string) {
  const follows = await Follow.findAll({
    where: { followerUserId },
    // include: [{ model: User, as: "followerUser" }],
  });

  return follows.map((follow) => follow.toJSON()) as TFollow[];
}

/**
 * isFollowing
 */
export async function isFollowing({
  followedUserId,
  followerUserId,
}: {
  followedUserId: string;
  followerUserId: string;
}) {
  const follow = await Follow.findOne({
    where: { followedUserId, followerUserId },
    // include: [{ model: User, as: "followerUser" }],
  });

  return Boolean(follow);
}
