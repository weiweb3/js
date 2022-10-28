import loginHandler from "./routes/login";
import logoutHandler from "./routes/logout";
import userHandler from "./routes/user";
import {
  Weiweb3AuthConfig,
  Weiweb3AuthRoute,
  Weiweb3AuthUser,
} from "./types";
import { Weiweb3SDK } from "@weiweb3/sdk";
import cookieParser from "cookie-parser";
import { Express, NextFunction, Request, Response } from "express";

export * from "./types";

export function getUser(req: Request): Weiweb3AuthUser | null {
  return req.user;
}

export function Weiweb3Auth(app: Express, cfg: Weiweb3AuthConfig) {
  const ctx = {
    ...cfg,
    sdk: Weiweb3SDK.fromPrivateKey(cfg.privateKey, "mainnet"),
  };

  const authUrl = cfg.authUrl?.replace(/\/$/, "") || "/auth";

  app.use(cookieParser());

  app.use(async (req: Request, _: Response, next: NextFunction) => {
    const { sdk, domain } = ctx;
    let user = null;
    const token = req.cookies.weiweb3_auth_token;

    if (token) {
      try {
        const address = await sdk.auth.authenticate(domain, token);

        if (ctx.callbacks?.user) {
          user = await ctx.callbacks.user(address);
        }

        user = { ...user, address };
      } catch {
        // No-op
      }
    }

    req.user = user as Weiweb3AuthUser | null;
    next();
  });

  app.get(`${authUrl}/:route`, (req: Request, res: Response) => {
    const action = req.params.route as Weiweb3AuthRoute;

    switch (action) {
      case "login":
        return loginHandler(req, res, ctx);
      case "user":
        return userHandler(req, res);
      case "logout":
        return logoutHandler(req, res);
      default:
        return res.status(400).json({
          message: "Invalid route for authentication.",
        });
    }
  });
}
