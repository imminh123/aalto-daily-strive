import { createServer } from "http";
import e from "express";
import { exitLog } from "./helpers";
import CONFIG from "./config";
import { connectDatabase } from "./db";

export const startServer = (app: e.Application) => {
  const httpServer = createServer(app);

  process
    .on("SIGINT", () => exitLog(null, "SIGINT"))
    .on("SIGQUIT", () => exitLog(null, "SIGQUIT"))
    .on("SIGTERM", () => exitLog(null, "SIGTERM"))
    .on("uncaughtException", (err) => exitLog(err, "uncaughtException"))
    .on("beforeExit", () => exitLog(null, "beforeExit"))
    .on("exit", () => exitLog(null, "exit"));

  connectDatabase()
    .then(() => {
      return httpServer.listen({ port: CONFIG.APP.PORT }, (): void => {
        process.stdout.write(`⚙️ Application Environment: ${CONFIG.APP.ENV}\n`);
        process.stdout.write(`⏱ Started on: ${Date.now()}\n`);
        process.stdout.write(
          `🚀 Server ready at http://localhost:${CONFIG.APP.PORT}\n`,
        );
      });
    })
    .catch((err) => exitLog(err, "Cannot connect to database"));
};
