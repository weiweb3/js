import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";

/**
 * The configuration to use the react SDK with an [auth](https://portal.weiweb3.com/auth) server.
 *
 * @beta
 */
export interface Weiweb3AuthConfig {
  /**
   * The backend URL of the authentication endoints. For example, if your endpoints are
   * at `/api/auth/login`, `/api/auth/logout`, etc. then this should be set to `/api/auth`.
   */
  authUrl: string;

  /**
   * The frontend domain used to generate the login payload.
   * This domain should match the domain used on your auth backend.
   */
  domain: string;

  /**
   * The URL to redirect to after a succesful login.
   */
  loginRedirect?: string;
}

const Weiweb3AuthConfigContext = createContext<Weiweb3AuthConfig | undefined>(
  undefined,
);

export const Weiweb3AuthConfigProvider: React.FC<
  PropsWithChildren<{ value?: Weiweb3AuthConfig }>
> = ({ value, children }) => {
  // Remove trailing slash from URL if present
  const authConfig = useMemo(
    () =>
      value
        ? {
            ...value,
            authUrl: value.authUrl.replace(/\/$/, ""),
          }
        : undefined,
    [value],
  );
  return (
    <Weiweb3AuthConfigContext.Provider value={authConfig}>
      {children}
    </Weiweb3AuthConfigContext.Provider>
  );
};

export function useWeiweb3AuthConfig() {
  return useContext(Weiweb3AuthConfigContext);
}
