import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import timeout from "connect-timeout";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import CONFIG from "./config";
import { expressPinoLogger } from "./helpers";
import { createContext } from "./context";
import * as errorHandler from "@/middlewares/errorHandler";
import routes from "@/routes";
import session from "express-session";
declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
    signed: Boolean;
  }
}
import schedule from "./scheduler/notification";
import MongoStore from "connect-mongo";
export const createApp = (): express.Application => {
  const app = express();

  app.use(
    session({
      secret: `${CONFIG.APP.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: "strict",
      },
      store: MongoStore.create({ mongoUrl: CONFIG.APP.MONGODB_URI as string }),
    }),
  );
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  if (CONFIG.APP.ENV !== "test") {
    app.use(morgan("dev"));
    app.use(expressPinoLogger());
  }

  app.use(timeout(CONFIG.SERVER.TIMEOUT));

  // API Routes
  app.use(`/api/${CONFIG.APP.VER}`, routes);

  // Error Middleware
  app.use(errorHandler.genericErrorHandler);
  app.use(errorHandler.notFoundError);
  schedule;
  return app;
};
