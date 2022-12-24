import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import logger from "../libs/logger";
import { TLoginBody, TSignupBody } from "../schemas/auth.schema";
import { UserReplySchema } from "../schemas/user.schema";
import { createUser } from "../services/auth.service";
import { getUserByEmail, getUserById } from "../services/user.service";
// import bcrypt from "bcrypt";

/**
 * signupHandler
 * ------------------
 * method: POST
 * body: TSignupBody
 */
export function signupHandler(server: FastifyInstance) {
  return async (
    request: FastifyRequest<{ Body: TSignupBody }>,
    reply: FastifyReply
  ) => {
    try {
      // check user exists
      const userExists = await getUserByEmail(request.body.email);
      if (userExists) {
        return reply.code(400).send({ message: "user already exists." });
      }

      // create user
      const user = await createUser(request.body);

      // accessToken
      const accessToken = await server.jwt.sign({ id: user.id });

      // cookie
      reply.setCookie("accessToken", accessToken, { httpOnly: true });

      return reply.code(200).send({
        accessToken,
      });
    } catch (error: any) {
      logger.error(error?.message, "Error: signupHandler.");
      return reply.code(400).send({ message: "Error: signupHandler." });
    }
  };
}

/**
 * loginHandler
 * ------------------
 * method: POST
 * body: TLoginBody
 */
export function loginHandler(server: FastifyInstance) {
  return async (
    request: FastifyRequest<{ Body: TLoginBody }>,
    reply: FastifyReply
  ) => {
    try {
      // check user exists
      const user = await getUserByEmail(request.body.email);
      if (!user) {
        return reply.code(400).send({ message: "invalid credincials." });
      }

      // check password
      const matchedPassword = user.password; //await bcrypt.compare(request.body.password, user.password);
      if (!matchedPassword) {
        return reply.code(400).send({ message: "invalid credincials." });
      }

      // accessToken
      const accessToken = await server.jwt.sign({ id: user.id });

      // cookie
      reply.setCookie("accessToken", accessToken, { httpOnly: true });

      return reply.code(200).send({
        accessToken,
      });
    } catch (error: any) {
      logger.error(error?.message, "Error: loginHandler.");
      return reply.code(400).send({ message: "Error: loginHandler." });
    }
  };
}

/**
 * logoutHandler
 * ------------------
 * method: POST
 */
export function logoutHandler(server: FastifyInstance) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // accessToken
      const accesssToken = "";

      // cookie
      reply.setCookie("accessToken", accesssToken, {
        secure: true,
        sameSite: "none",
      });

      return reply.code(200).send({
        accesssToken,
      });
    } catch (error: any) {
      logger.error(error?.message, "Error: logoutHandler.");
      return reply.code(400).send({ message: "Error: logoutHandler." });
    }
  };
}

/**
 * authUserHandler
 * ------------------
 * method: GET
 */
export function authUserHandler(server: FastifyInstance) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const auth = request.user as { id: string };

      const user = await getUserById(auth.id);

      return reply.code(200).send({
        user: UserReplySchema.parse(user),
      });
    } catch (error: any) {
      logger.error(error?.message, "Error: authUserHandler.");
      return reply.code(400).send({ message: "Error: authUserHandler." });
    }
  };
}
