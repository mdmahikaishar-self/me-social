import { FastifyReply, FastifyRequest } from "fastify";
import logger from "../libs/logger";
import {
  StoriesReplySchema,
  StoryReplySchema,
  TStoryCreateBody,
} from "../schemas/story.schema";
import {
  createStory,
  getAllStories,
  deleteStory,
  getStory,
} from "../services/story.service";

/**
 * createStoryHandler
 * ------------------
 * method: POST
 * body: TStoryCreateBody
 */
export async function createStoryHandler(
  request: FastifyRequest<{ Body: TStoryCreateBody }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // create story
    const story = await createStory(request.body, auth.id);

    return reply.code(200).send({ message: "Story has been created." });
  } catch (error: any) {
    logger.error(error?.message, "Error: createStoryHandler.");
    return reply.code(400).send({ message: "Error: createStoryHandler." });
  }
}

/**
 * deleteStoryHandler
 * ------------------
 * method: DELETE
 * params: storyId
 */
export async function deleteStoryHandler(
  request: FastifyRequest<{ Querystring: { storyId: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // delete story
    const isDeleted = await deleteStory({
      storyId: request.query.storyId,
      userId: auth.id,
    });

    return reply.code(200).send({ deleted: isDeleted });
  } catch (error: any) {
    logger.error(error?.message, "Error: deleteStoryHandler.");
    return reply.code(400).send({ message: "Error: deleteStoryHandler." });
  }
}

/**
 * getAllStoriesHandler
 * ------------------
 * method: GET
 */
export async function getAllStoriesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // get all stories
    const stories = await getAllStories(auth.id);

    return reply.code(200).send({
      stories: StoriesReplySchema.parse(stories),
    });
  } catch (error: any) {
    logger.error(error?.message, "Error: getAllStoriesHandler.");
    return reply.code(400).send({ message: "Error: getAllStoriesHandler." });
  }
}

/**
 * getStoryHandler
 * ------------------
 * method: GET
 * query: storyId
 */
export async function getStoryHandler(
  request: FastifyRequest<{ Querystring: { storyId: string } }>,
  reply: FastifyReply
) {
  try {
    const auth = request.user as { id: string };

    // get story
    const story = await getStory({
      storyId: request.query.storyId,
      userId: auth.id,
    });

    return reply.code(200).send({ story: StoryReplySchema.parse(story) });
  } catch (error: any) {
    logger.error(error?.message, "Error: getStoryHandler.");
    return reply.code(400).send({ message: "Error: getStoryHandler." });
  }
}
