import {
  QueryClientProviderProps,
  QueryClientProviderWithDefault,
} from "../../core/providers/query-client";
import { RequiredParam } from "../../core/query-utils/required-param";
import { ComponentWithChildren } from "../../core/types/component";
import {
  Weiweb3AuthConfig,
  Weiweb3AuthConfigProvider,
} from "../contexts/weiweb3-auth";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import { Network, Weiweb3SDK } from "@weiweb3/sdk/solana";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import invariant from "tiny-invariant";

interface Weiweb3SDKProviderProps extends QueryClientProviderProps {
  network: RequiredParam<Network>;
  wallet?: WalletContextState;
  authConfig?: Weiweb3AuthConfig;
}

/**
 * Gives access to the Weiweb3SDK instance and other useful hooks to the rest of the app.
 * Requires to be wrapped with a ConnectionProvider and a WalletProvider from @solana/wallet-adapter-react.
 * @example
 * ```tsx
 * import { useWallet } from "@solana/wallet-adapter-react";
 * import { Weiweb3Provider } from "@weiweb3/react/solana";
 *
 * const Weiweb3App = () => {
 *  const wallet = useWallet();
 *  return (
 *    <Weiweb3SDKProvider network={"devnet"} wallet={wallet}>
 *      <YourApp />
 *    </Weiweb3SDKProvider>
 * )};
 * ```
 */
export const Weiweb3SDKProvider: ComponentWithChildren<
  Weiweb3SDKProviderProps
> = ({ children, network, queryClient, wallet, authConfig }) => {
  const [sdk, setSDK] = useState<Weiweb3SDK | null>(null);

  useEffect(() => {
    if (network) {
      const _sdk = Weiweb3SDK.fromNetwork(network);
      if (wallet && wallet.publicKey) {
        _sdk.wallet.connect(wallet);
      }
      (_sdk as any)._network = network;
      setSDK(_sdk);
    } else {
      setSDK(null);
    }
    // disabled wallet on purpose because we handle that below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);

  useEffect(() => {
    if (
      wallet &&
      wallet.publicKey &&
      sdk &&
      (sdk as any)._network === network
    ) {
      sdk.wallet.connect(wallet);
      return;
    }
  }, [network, sdk, wallet]);

  const ctxValue = useMemo(
    () =>
      ({
        sdk,
        desiredNetwork: network || "unknown",
        _inProvider: true,
      } as const),
    [sdk, network],
  );

  return (
    <QueryClientProviderWithDefault queryClient={queryClient}>
      <Weiweb3AuthConfigProvider value={authConfig}>
        <Weiweb3SDKContext.Provider value={ctxValue}>
          {children}
        </Weiweb3SDKContext.Provider>
      </Weiweb3AuthConfigProvider>
    </QueryClientProviderWithDefault>
  );
};

interface Weiweb3SDKContext {
  sdk: Weiweb3SDK | null;
  desiredNetwork: string;
  _inProvider?: true;
}
const Weiweb3SDKContext = createContext<Weiweb3SDKContext>({
  sdk: null,
  desiredNetwork: "unknown",
});

export function useSDK() {
  const ctxValue = useContext(Weiweb3SDKContext);
  invariant(
    ctxValue._inProvider,
    "useSDK must be used within a Weiweb3SDKProvider",
  );
  if (
    !ctxValue.sdk ||
    (ctxValue.sdk as any)._network !== ctxValue.desiredNetwork
  ) {
    return null;
  }
  return ctxValue.sdk;
}
