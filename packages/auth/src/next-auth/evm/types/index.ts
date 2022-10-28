import { NextAuthOptions } from "next-auth";

export type Weiweb3NextAuthConfig = {
  privateKey: string;
  domain: string;
  nextOptions: NextAuthOptions;
};
