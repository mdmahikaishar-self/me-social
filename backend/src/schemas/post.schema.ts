import { z } from "zod";
import { UserReplySchema, UserSchema } from "./user.schema";
import { LikesReplySchema } from "./like.schema";
import { CommentsReplySchema } from "./comment.schema";
// import { } from "fastify-zod"

export const PostModelSchema = z.object({
  id: z.string(),
  text: z.string(),
  img: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  userId: z.string().optional(),
});
export const PostSchema = z.object({
  id: z.string(),
  text: z.string(),
  img: z.string().optional(),
  createdAt: z.string(),
  userId: z.string(),
  user: UserSchema,
  likes: LikesReplySchema,
  comments: CommentsReplySchema,
});

export const PostCreateBodySchema = z.object({
  text: z.string(),
  img: z.string().optional(),
});

export const PostReplySchema = z.object({
  id: z.string(),
  text: z.string(),
  img: z.string().optional(),
  createdAt: z.date(),
  user: UserReplySchema,
  likes: LikesReplySchema,
  comments: CommentsReplySchema,
});
export const PostsReplySchema = z.array(PostReplySchema);

export type TPost = z.infer<typeof PostSchema>;
export type TPostModel = z.infer<typeof PostModelSchema>;
export type TPostCreateBody = z.infer<typeof PostCreateBodySchema>;
export type TPostReply = z.infer<typeof PostReplySchema>;
export type TPostsReply = z.infer<typeof PostsReplySchema>;

// export const {schemas: PostSchemas, $ref} = buildJsonSchemas({createPostSchema});
