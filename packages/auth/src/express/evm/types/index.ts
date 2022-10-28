import { Weiweb3SDK } from "@weiweb3/sdk";
import { Request } from "express";

export type Weiweb3AuthRoute = "login" | "user" | "logout";

export type Weiweb3AuthConfig = {
  privateKey: string;
  domain: string;
  authUrl?: string;
  callbacks?: {
    login?: (address: string) => Promise<void> | void;
    user?: (
      address: string,
    ) =>
      | Promise<Omit<Weiweb3AuthUser, "address">>
      | Omit<Weiweb3AuthUser, "address">;
  };
};

export type Weiweb3AuthContext = {
  sdk: Weiweb3SDK;
  domain: string;
  callbacks?: {
    login?: (address: string) => Promise<void> | void;
    user?: (
      address: string,
    ) =>
      | Promise<Omit<Weiweb3AuthUser, "address">>
      | Omit<Weiweb3AuthUser, "address">;
  };
};

export type Weiweb3AuthUser = {
  address: string;
  [key: string]: any;
};

export type RequestWithUser = Request & {
  user: Weiweb3AuthUser | null;
};
