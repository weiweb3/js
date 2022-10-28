import loginHandler from "./routes/login";
import logoutHandler from "./routes/logout";
import userHandler from "./routes/user";
import {
  Weiweb3AuthConfig,
  Weiweb3AuthContext,
  Weiweb3AuthRoute,
  Weiweb3AuthUser,
} from "./types";
import { Weiweb3SDK } from "@weiweb3/sdk";
import { NextRequest } from "next/server";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";

export * from "./types";

async function Weiweb3AuthRouter(
  req: NextApiRequest,
  res: NextApiResponse,
  ctx: Weiweb3AuthContext,
) {
  // Catch-all route must be named with [...weiweb3]
  const { weiweb3 } = req.query;
  const action = weiweb3?.[0] as Weiweb3AuthRoute;

  switch (action) {
    case "login":
      return await loginHandler(req, res, ctx);
    case "user":
      return await userHandler(req, res, ctx);
    case "logout":
      return await logoutHandler(req, res);
    default:
      return res.status(400).json({
        message: "Invalid route for authentication.",
      });
  }
}

export function Weiweb3Auth(cfg: Weiweb3AuthConfig) {
  const ctx = {
    ...cfg,
    sdk: Weiweb3SDK.fromPrivateKey(cfg.privateKey, "mainnet"),
  };

  function Weiweb3AuthHandler(
    ...args: [] | [NextApiRequest, NextApiResponse]
  ) {
    if (args.length === 0) {
      return async (req: NextApiRequest, res: NextApiResponse) =>
        await Weiweb3AuthRouter(req, res, ctx);
    }

    return Weiweb3AuthRouter(args[0], args[1], ctx);
  }

  async function getUser(
    req: GetServerSidePropsContext["req"] | NextRequest | NextApiRequest,
  ) {
    const { sdk, domain } = ctx;
    let user: Weiweb3AuthUser | null = null;
    const token =
      typeof req.cookies.get === "function"
        ? (req.cookies as any).get("weiweb3_auth_token")
        : (req.cookies as any).weiweb3_auth_token;

    if (token) {
      try {
        const address = await sdk.auth.authenticate(domain, token);
        user = { address };
      } catch {
        // No-op
      }
    }

    return user;
  }

  return { Weiweb3AuthHandler, getUser };
}
