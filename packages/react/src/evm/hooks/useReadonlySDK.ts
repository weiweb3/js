import { SDKOptions, Weiweb3SDK } from "@weiweb3/sdk";
import type { Weiweb3Storage } from "@weiweb3/storage";
import { useMemo } from "react";

/**
 * @internal
 */
export function useReadonlySDK(
  readonlyRpcUrl: string,
  sdkOptions: SDKOptions,
  storageInterface?: Weiweb3Storage,
): Weiweb3SDK {
  return useMemo(() => {
    return new Weiweb3SDK(
      readonlyRpcUrl,
      {
        ...sdkOptions,
        readonlySettings: {
          ...sdkOptions?.readonlySettings,
          rpcUrl: readonlyRpcUrl,
        },
      },
      storageInterface,
    );
    // storageInterface should be constant!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readonlyRpcUrl, sdkOptions]);
}
