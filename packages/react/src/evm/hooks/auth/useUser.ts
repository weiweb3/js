import { useWeiweb3AuthConfig } from "../../contexts/weiweb3-auth";
import { cacheKeys } from "../../utils/cache-keys";
import { useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";

export interface Weiweb3AuthUser {
  address: string;
}

/**
 * Hook to get the currently logged in user.
 *
 * @returns - The currently logged in user or null if not logged in, as well as a loading state.
 *
 * @beta
 */
export function useUser() {
  const authConfig = useWeiweb3AuthConfig();

  const { data: user, isLoading } = useQuery(
    cacheKeys.auth.user(),
    async () => {
      invariant(
        authConfig,
        "Please specify an authConfig in the Weiweb3Provider",
      );
      const res = await fetch(`${authConfig.authUrl}/user`);
      return (await res.json()) as Weiweb3AuthUser;
    },
    {
      enabled: !!authConfig,
    },
  );

  return { user, isLoading };
}
