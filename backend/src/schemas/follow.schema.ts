import { z } from "zod";
import { UserReplySchema, UserSchema } from "./user.schema";
// import { } from "fastify-zod"

export const FollowModelSchema = z.object({
  id: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  followerUserId: z.string().optional(),
  followedUserId: z.string().optional(),
});
export const FollowSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  followerUserId: z.string().optional(),
  followedUserId: z.string().optional(),
  fllowerUser: UserSchema,
  fllowedUser: UserSchema,
});

export const FollowReplySchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  followerUserId: z.string().optional(),
  followedUserId: z.string().optional(),
  fllowerUser: UserReplySchema,
  fllowedUser: UserReplySchema,
});
export const FollowsReplySchema = z.array(FollowReplySchema);

export type TFollow = z.infer<typeof FollowSchema>;
export type TFollowModel = z.infer<typeof FollowModelSchema>;
export type TFollowReply = z.infer<typeof FollowReplySchema>;
export type TFollowsReply = z.infer<typeof FollowsReplySchema>;

// export const {schemas: FollowSchemas, $ref} = buildJsonSchemas({createFollowSchema});
