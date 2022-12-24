import createServer from "./createServer";
import logger from "./logger";
import gracefulShutdown from "./gracefulShutdown";
import db from "./db";
import config from "../config";

export default async function startServer() {
  const server = await createServer();

  // start database
  await db.sync();
  logger.log("Database is connected...");

  // start server
  server.listen({ host: config.HOST, port: config.PORT });
  logger.log("Server is started...");

  // shutdown
  gracefulShutdown(server);

  return server;
}
