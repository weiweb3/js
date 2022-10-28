import { ensureTWPrefix } from "../../../core/query-utils/query-key";
import { useWeiweb3AuthConfig } from "../../contexts/weiweb3-auth";
import { useQueryClient } from "@tanstack/react-query";
import invariant from "tiny-invariant";

/**
 * Hook to logout the connected wallet from the backend.
 * The backend logout URL must be configured on the Weiweb3Provider.
 *
 * @returns - A function to invoke to logout.
 *
 * @beta
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const authConfig = useWeiweb3AuthConfig();

  function logout() {
    invariant(
      authConfig,
      "Please specify an authConfig in the Weiweb3Provider",
    );
    queryClient.invalidateQueries(ensureTWPrefix(["user"]));
    window.location.href = `${authConfig.authUrl}/logout`;
  }

  return logout;
}
