import { z } from "zod";
import { UserReplySchema, UserSchema } from "./user.schema";
// import { } from "fastify-zod"

export const StoryModelSchema = z.object({
  id: z.string(),
  img: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  userId: z.string().optional(),
});
export const StorySchema = z.object({
  id: z.string(),
  img: z.string(),
  createdAt: z.string(),
  userId: z.string(),
  user: UserSchema,
});

export const StoryCreateBodySchema = z.object({
  img: z.string(),
});

export const StoryReplySchema = z.object({
  id: z.string(),
  img: z.string(),
  createdAt: z.date(),
  user: UserReplySchema,
});
export const StoriesReplySchema = z.array(StoryReplySchema);

export type TStory = z.infer<typeof StorySchema>;
export type TStoryModel = z.infer<typeof StoryModelSchema>;
export type TStoryCreateBody = z.infer<typeof StoryCreateBodySchema>;
export type TStoryReply = z.infer<typeof StoryReplySchema>;
export type TStoriesReply = z.infer<typeof StoriesReplySchema>;

// export const {schemas: StorySchemas, $ref} = buildJsonSchemas({createStorySchema});
