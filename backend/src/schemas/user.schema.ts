import { z } from "zod";
// import { } from "fastify-zod"

export const UserModelSchema = z.object({
  password: z.string(),

  id: z.string(),
  name: z.string(),
  email: z.string().email(),

  img: z.string().optional(),
  cover: z.string().optional(),
  website: z.string().optional(),
  city: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export const UserSchema = UserModelSchema;

export const UpdateUserBodySchema = z.object({
  name: z.string(),
  img: z.string().optional(),
  cover: z.string().optional(),
  website: z.string().optional(),
  city: z.string().optional(),
});

export const UserReplySchema = z.object({
  id: z.string(),
  name: z.string(),
  img: z.string(),
});
export const UserLongReplySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  img: z.string(),
  cover: z.string(),
  website: z.string(),
  city: z.string(),
  createdAt: z.date(),
});

export type TUser = z.infer<typeof UserSchema>;
export type TUserModel = z.infer<typeof UserModelSchema>;
export type TUpdateUserBody = z.infer<typeof UpdateUserBodySchema>;
export type TUserReply = z.infer<typeof UserReplySchema>;
export type TUserLongReply = z.infer<typeof UserLongReplySchema>;

// export const {schemas: userSchemas, $ref} = buildJsonSchemas({createUserSchema});
