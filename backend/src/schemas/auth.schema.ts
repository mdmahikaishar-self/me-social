import { z } from "zod";
import { UserReplySchema } from "./user.schema";
// import { } from "fastify-zod"

const SignupBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  img: z.string(),
});

const LoginBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const AuthReplySchema = z.object({
  user: UserReplySchema,
  accessToken: z.string(),
});

export type TSignupBody = z.infer<typeof SignupBodySchema>;
export type TLoginBody = z.infer<typeof LoginBodySchema>;
export type TAuthReply = z.infer<typeof AuthReplySchema>;

// export const {schemas: userSchemas, $ref} = buildJsonSchemas({createUserSchema});
