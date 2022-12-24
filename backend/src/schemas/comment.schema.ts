import { z } from "zod";
import { UserReplySchema, UserSchema } from "./user.schema";
// import { } from "fastify-zod"

export const CommentModelSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  userId: z.string().optional(),
  postId: z.string().optional(),
});
export const CommentSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
  postId: z.string(),
  user: UserSchema,
});

export const CommentCreateBodySchema = z.object({
  text: z.string(),
});

export const CommentReplySchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  user: UserReplySchema,
});
export const CommentsReplySchema = z.array(CommentReplySchema);

export type TComment = z.infer<typeof CommentSchema>;
export type TCommentModel = z.infer<typeof CommentModelSchema>;
export type TCommentCreateBody = z.infer<typeof CommentCreateBodySchema>;
export type TCommentReply = z.infer<typeof CommentReplySchema>;
export type TCommentsReply = z.infer<typeof CommentsReplySchema>;

// export const {schemas: CommentSchemas, $ref} = buildJsonSchemas({createCommentSchema});
