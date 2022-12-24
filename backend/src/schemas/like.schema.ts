import { z } from "zod";
import { UserSchema } from "./user.schema";

export const LikeModelSchema = z.object({
  id: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  userId: z.string().optional(),
  postId: z.string().optional(),
});
export const LikeSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
  postId: z.string(),
  user: UserSchema,
});

export const LikeReplySchema = z.object({
  id: z.string(),
  userId: z.string(),
});
export const LikesReplySchema = z.array(LikeReplySchema);

export type TLike = z.infer<typeof LikeSchema>;
export type TLikeModel = z.infer<typeof LikeModelSchema>;
export type TLikeReply = z.infer<typeof LikeReplySchema>;
export type TLikesReply = z.infer<typeof LikesReplySchema>;

// export const {schemas: LikeSchemas, $ref} = buildJsonSchemas({createLikeSchema});
