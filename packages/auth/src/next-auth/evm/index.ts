import { Weiweb3NextAuthConfig } from "./types";
import { Weiweb3SDK } from "@weiweb3/sdk";
import { serialize } from "cookie";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import NextAuth, {
  NextAuthOptions,
  Session,
  unstable_getServerSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export function Weiweb3NextAuth(cfg: Weiweb3NextAuthConfig) {
  const sdk = Weiweb3SDK.fromPrivateKey(cfg.privateKey, "mainnet");

  function Weiweb3Provider(res: GetServerSidePropsContext["res"]) {
    return CredentialsProvider({
      name: "Weiweb3Auth",
      credentials: {
        payload: {
          label: "Payload",
          type: "text",
          placeholder: "",
        },
      },
      async authorize({ payload }: any) {
        try {
          const parsed = JSON.parse(payload);
          const token = await sdk.auth.generateAuthToken(cfg.domain, parsed);
          const address = await sdk.auth.authenticate(cfg.domain, token);

          // Securely set httpOnly cookie on request to prevent XSS on frontend
          // And set path to / to enable weiweb3_auth_token usage on all endpoints
          res.setHeader(
            "Set-Cookie",
            serialize("weiweb3_auth_token", token, {
              path: "/",
              httpOnly: true,
              secure: true,
              sameSite: "strict",
            }),
          );

          return { address };
        } catch (err) {
          return null;
        }
      },
    });
  }

  function nextOptions(
    req: GetServerSidePropsContext["req"],
    res: GetServerSidePropsContext["res"],
  ): NextAuthOptions {
    async function session({
      session: _session,
    }: {
      session: Session;
    }): Promise<Session> {
      const token = req.cookies.weiweb3_auth_token || "";
      try {
        const address = await sdk.auth.authenticate(cfg.domain, token);
        _session.user = { ..._session.user, address } as Session["user"];
        return _session;
      } catch {
        return _session;
      }
    }

    function signOut() {
      res.setHeader(
        "Set-Cookie",
        serialize("weiweb3_auth_token", "", {
          path: "/",
          expires: new Date(Date.now() + 5 * 1000),
        }),
      );
    }

    const providers: NextAuthOptions["providers"] = [
      ...cfg.nextOptions.providers,
      Weiweb3Provider(res),
    ];

    const configSession = cfg.nextOptions.callbacks?.session;
    const callbacks: NextAuthOptions["callbacks"] = {
      ...cfg.nextOptions.callbacks,
      session: configSession
        ? async (params) => {
            params.session = await session(params);
            return configSession(params);
          }
        : session,
    };

    const configSignOut = cfg.nextOptions.events?.signOut;
    const events: NextAuthOptions["events"] = {
      ...cfg.nextOptions.events,
      signOut: configSignOut
        ? async (params) => {
            signOut();
            return configSignOut(params);
          }
        : signOut,
    };

    return {
      ...cfg.nextOptions,
      providers,
      callbacks,
      events,
    };
  }

  async function getUser(
    ...args:
      | [NextApiRequest, NextApiResponse]
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
  ) {
    return unstable_getServerSession(
      args[0],
      args[1],
      nextOptions(args[0], args[1]),
    );
  }

  function NextAuthHandler(...args: [] | [NextApiRequest, NextApiResponse]) {
    if (args.length === 0) {
      return (req: NextApiRequest, res: NextApiResponse) => {
        return NextAuth(req, res, nextOptions(req, res));
      };
    }

    return NextAuth(args[0], args[1], nextOptions(args[0], args[1]));
  }

  return {
    NextAuthHandler,
    getUser,
  };
}
