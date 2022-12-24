import { User, Story } from "../models";
import crypto from "crypto";
import { TStory, TStoryCreateBody } from "../schemas/story.schema";

/**
 * createStory
 */
export async function createStory(body: TStoryCreateBody, userId: string) {
  const id = await crypto.randomUUID();
  const story = await Story.create({ ...body, id, userId });
  return story.toJSON() as TStory;
}

/**
 * deleteStory
 */
export async function deleteStory({
  userId,
  storyId,
}: {
  userId: string;
  storyId: string;
}) {
  const story = await Story.destroy({ where: { id: storyId, userId } });
  return Boolean(story);
}

/**
 * getAllStories
 */
export async function getAllStories(userId: string) {
  const stories = await Story.findAll({
    include: [{ model: User }],
  });

  return stories.map((story) => story.toJSON()) as TStory[];
}

/**
 * getStory
 */
export async function getStory({
  storyId,
  userId,
}: {
  storyId: string;
  userId: string;
}) {
  const story = await Story.findOne({
    where: { id: storyId },
    include: [{ model: User }],
  });

  return story?.toJSON() as TStory;
}
