import { Weiweb3AuthUser } from "..";

export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user: Weiweb3AuthUser | null;
    }
  }
}
