import { FastifyInstance } from "fastify";
import authRoutes from "./auth.route";
import commentRoutes from "./comment.route";
import followRoutes from "./follow.route";
import indexRoutes from "./index.route";
import likeRoutes from "./like.route";
import postRoutes from "./post.route";
import storyRoutes from "./story.route";
import userRoutes from "./user.route";

export default function registerRoutes(server: FastifyInstance) {
  server.register(indexRoutes, { prefix: "/" });
  server.register(authRoutes, { prefix: "/api/auth" });
  server.register(userRoutes, { prefix: "/api/user" });
  server.register(postRoutes, { prefix: "/api/post" });
  server.register(commentRoutes, { prefix: "/api/comment" });
  server.register(likeRoutes, { prefix: "/api/like" });
  server.register(storyRoutes, { prefix: "/api/story" });
  server.register(followRoutes, { prefix: "/api/follow" });
}
