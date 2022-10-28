import { Weiweb3SDK } from "@weiweb3/sdk";

export type Weiweb3AuthRoute = "login" | "logout" | "user";

export type Weiweb3AuthConfig = {
  privateKey: string;
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
