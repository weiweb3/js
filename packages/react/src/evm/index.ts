// providers
export * from "./providers/base";
export * from "./providers/full";

// contract hooks
export * from "./hooks/contracts";
// async contract hooks
export * from "./hooks/async/contracts";
export * from "./hooks/async/nft";
export * from "./hooks/async/drop";
export * from "./hooks/async/marketplace";
export * from "./hooks/async/token";
export * from "./hooks/async/claim-conditions";

export * from "./hooks/async/contract-settings";
export * from "./hooks/async/roles";

// weiweb3 hooks (work as long as at least `<Weiweb3SdkProvider>` is used)
export * from "./hooks/auth";
export * from "./hooks/storage";
export * from "./hooks/useSigner";
export * from "./hooks/useReadonlySDK";
export * from "./hooks/useNetworkMismatch";
export * from "./hooks/wallet";

// require to be inside `<Weiweb3Provider />`
export * from "./hooks/wagmi-required/useAccount";
export * from "./hooks/wagmi-required/useNetwork";
export * from "./hooks/wagmi-required/useDisconnect";
export * from "./hooks/wagmi-required/useConnect";
export * from "./hooks/connectors/useMetamask";
export * from "./hooks/connectors/useWalletConnect";
export * from "./hooks/connectors/useWalletLink";

// re-exports
export { ChainId } from "@weiweb3/sdk";

// types
export * from "./types";
export type { Weiweb3AuthConfig } from "./contexts/weiweb3-auth";

// ui components
export * from "./components/MediaRenderer";
export * from "./components/NftMedia";
export * from "./components/ConnectWallet";
export * from "./components/Web3Button";
