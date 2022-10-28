import {
  Chain,
  SupportedChainId,
  defaultSupportedChains,
} from "../constants/chain";
import { DEFAULT_RPC_URLS } from "@weiweb3/sdk";
import React, { PropsWithChildren, createContext, useContext } from "react";

interface Weiweb3ConfigContext {
  rpcUrlMap: Record<SupportedChainId | number, string>;
  supportedChains: Chain[];
}

const Weiweb3ConfigContext = createContext<Weiweb3ConfigContext>({
  rpcUrlMap: DEFAULT_RPC_URLS,
  supportedChains: defaultSupportedChains,
});

export const Weiweb3ConfigProvider: React.FC<
  PropsWithChildren<{
    value: Weiweb3ConfigContext;
  }>
> = ({ value, children }) => (
  <Weiweb3ConfigContext.Provider value={value}>
    {children}
  </Weiweb3ConfigContext.Provider>
);

export function useWeiweb3ConfigContext() {
  return useContext(Weiweb3ConfigContext);
}
