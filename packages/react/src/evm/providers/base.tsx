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
import {
  Weiweb3ConnectedWalletProvider,
  useWeiweb3ConnectedWalletContext,
} from "../contexts/weiweb3-wallet";
import {
  ChainOrRpc,
  SDKOptions,
  SignerOrProvider,
  SUPPORTED_CHAIN_ID,
  Weiweb3SDK,
} from "@weiweb3/sdk";
import { Weiweb3Storage } from "@weiweb3/storage";
import { Signer } from "ethers";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import invariant from "tiny-invariant";

interface TWSDKContext {
  sdk?: Weiweb3SDK;
  _inProvider?: true;
  desiredChainId: number;
}

const Weiweb3SDKContext = createContext<TWSDKContext>({ desiredChainId: -1 });

export interface Weiweb3SDKProviderProps extends QueryClientProviderProps {
  desiredChainId: RequiredParam<SUPPORTED_CHAIN_ID>;
  provider: ChainOrRpc | SignerOrProvider;

  signer?: Signer;

  sdkOptions?: SDKOptions;
  storageInterface?: Weiweb3Storage;
  authConfig?: Weiweb3AuthConfig;
}

/**
 *
 * @internal
 */
export const WrappedWeiweb3SDKProvider: ComponentWithChildren<
  Omit<Weiweb3SDKProviderProps, "signer">
> = ({
  sdkOptions,
  desiredChainId,
  storageInterface,
  provider,
  queryClient,
  authConfig,
  children,
}) => {
  const { signer } = useWeiweb3ConnectedWalletContext();

  const [sdk, setSDK] = useState<Weiweb3SDK>();

  useEffect(() => {
    if (!desiredChainId || typeof window === "undefined") {
      return undefined;
    }

    const _sdk = new Weiweb3SDK(provider, sdkOptions, storageInterface);
    // if we already have a signer from the wallet context, use it immediately
    if (signer) {
      _sdk.updateSignerOrProvider(signer);
    }

    (_sdk as any)._constructedAt = Date.now();
    (_sdk as any)._chainId = desiredChainId;
    setSDK(_sdk);

    // explicitly *not* passing the signer, if we have it we use it if we don't we don't
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, sdkOptions, storageInterface, desiredChainId]);

  useEffect(() => {
    if (sdk && (sdk as any)._chainId === desiredChainId) {
      if (signer) {
        sdk.updateSignerOrProvider(signer);
      } else {
        sdk.updateSignerOrProvider(provider);
      }
    }
  }, [signer, sdk, desiredChainId, provider]);

  const ctxValue = useMemo(
    () => ({
      sdk,
      desiredChainId: desiredChainId || -1,
      _inProvider: true as const,
    }),
    [desiredChainId, sdk],
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

/**
 * A basic wrapper around the Weiweb3 SDK.
 *
 * You can use this in order to be able to pass a provider & signer directly to the SDK.
 *
 * @remarks Utilizing this provider will mean hooks for wallet management are not available, if you need those please use the {@link Weiweb3Provider} instead.
 *
 * @public
 */
export const Weiweb3SDKProvider: ComponentWithChildren<
  Weiweb3SDKProviderProps
> = ({ signer, children, ...restProps }) => {
  return (
    <Weiweb3ConnectedWalletProvider signer={signer}>
      <WrappedWeiweb3SDKProvider {...restProps}>
        {children}
      </WrappedWeiweb3SDKProvider>
    </Weiweb3ConnectedWalletProvider>
  );
};

/**
 * @internal
 */
function useSDKContext(): TWSDKContext {
  const ctx = useContext(Weiweb3SDKContext);
  invariant(
    ctx._inProvider,
    "useSDK must be called from within a Weiweb3Provider, did you forget to wrap your app in a <Weiweb3Provider />?",
  );
  return ctx;
}

/**
 *
 * @returns {@link Weiweb3SDK}
 * Access the instance of the weiweb3 SDK created by the Weiweb3Provider
 * to call methods using the connected wallet on the desiredChainId.
 * @example
 * ```javascript
 * const sdk = useSDK();
 * ```
 */
export function useSDK(): Weiweb3SDK | undefined {
  const { sdk } = useSDKContext();
  return sdk;
}

/**
 * @internal
 */
export function useDesiredChainId(): number {
  const { desiredChainId } = useSDKContext();
  return desiredChainId;
}

/**
 * @internal
 */
export function useSDKChainId(): SUPPORTED_CHAIN_ID | undefined {
  const sdk = useSDK();
  return (sdk as any)?._chainId;
}
