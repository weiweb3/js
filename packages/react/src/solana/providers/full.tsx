import { Weiweb3AuthConfig } from "../contexts/weiweb3-auth";
import { Weiweb3SDKProvider } from "./base";
import type { WalletAdapter } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { getUrlForNetwork, Network } from "@weiweb3/sdk/solana";
import { PropsWithChildren } from "react";

interface Weiweb3ProviderProps {
  network: Network;
  wallets?: WalletAdapter[];
  autoConnect?: boolean;
  authConfig?: Weiweb3AuthConfig;
}

const DEFAULT_WALLETS = [new PhantomWalletAdapter()];

/**
 * Gives access to the Weiweb3SDK instance and other useful hooks to the rest of the app.
 * Requires to be wrapped with a ConnectionProvider and a WalletProvider from @solana/wallet-adapter-react.
 * @example
 * ```tsx
 * import { Weiweb3Provider } from "@weiweb3/react/solana";
 *
 * const App = () => {
 *  return (
 *     <Weiweb3Provider network="devnet">
 *       <YourApp />
 *     </Weiweb3Provider>
 * )};
 * ```
 * @beta
 */
export const Weiweb3Provider: React.FC<
  PropsWithChildren<Weiweb3ProviderProps>
> = ({
  network,
  wallets = DEFAULT_WALLETS,
  autoConnect = true,
  authConfig,
  children,
}) => {
  const clusterUrl = getUrlForNetwork(network);
  return (
    <ConnectionProvider endpoint={clusterUrl}>
      <WalletProvider wallets={wallets} autoConnect={autoConnect}>
        <Weiweb3WrapperProvider network={network} authConfig={authConfig}>
          {children}
        </Weiweb3WrapperProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

/**
 * @internal
 */
export const Weiweb3WrapperProvider: React.FC<
  PropsWithChildren<{ network?: Network; authConfig?: Weiweb3AuthConfig }>
> = ({ network, authConfig, children }) => {
  const wallet = useWallet();
  return (
    <Weiweb3SDKProvider
      network={network}
      wallet={wallet}
      authConfig={authConfig}
    >
      {children}
    </Weiweb3SDKProvider>
  );
};
