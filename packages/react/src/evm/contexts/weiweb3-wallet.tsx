import { __DEV__ } from "../constants/runtime";
import { useWeiweb3ConfigContext } from "./weiweb3-config";
import { UserWallet } from "@weiweb3/sdk";
import { Signer } from "ethers";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface Weiweb3ConnectedWalletContext {
  wallet: UserWallet | undefined;
  address: string | undefined;
  chainId: number | undefined;
  signer: Signer | undefined;
}

const INITIAL_CONTEXT_VALUE: Weiweb3ConnectedWalletContext = {
  wallet: undefined,
  address: undefined,
  chainId: undefined,
  signer: undefined,
};

const Weiweb3ConnectedWalletContext =
  createContext<Weiweb3ConnectedWalletContext>(INITIAL_CONTEXT_VALUE);

export const Weiweb3ConnectedWalletProvider: React.FC<
  PropsWithChildren<{ signer?: Signer }>
> = ({ signer, children }) => {
  const { rpcUrlMap } = useWeiweb3ConfigContext();

  const [contextValue, setContextValue] =
    useState<Weiweb3ConnectedWalletContext>({
      ...INITIAL_CONTEXT_VALUE,
      signer: signer ? signer : undefined,
    });

  useEffect(() => {
    setContextValue((val) => ({
      ...val,
      signer: signer ? signer : undefined,
    }));
  }, [signer]);

  useEffect(() => {
    let s = signer;
    if (signer) {
      // just get both of these up front and keep them around with the context
      Promise.all([signer.getAddress(), signer.getChainId()])
        .then(([address, chainId]) => {
          const rpcUrl = rpcUrlMap[chainId];
          // only if the signer is still the same!
          if (signer === s) {
            const wallet = new UserWallet(signer, {
              readonlySettings: rpcUrl
                ? {
                    rpcUrl,
                    chainId,
                  }
                : undefined,
            });
            setContextValue({ wallet, address, chainId, signer });
          }
        })
        .catch((err) => {
          if (__DEV__) {
            console.warn(
              "failed to get wallet instance in `<Weiweb3ConnectedWalletProvider />`",
              err,
            );
          }
        });
    } else {
      // if signer is not provided, re-set the context value to initial values
      setContextValue(INITIAL_CONTEXT_VALUE);
    }
    return () => {
      // set the previous signer to undefined because it is invalid now
      s = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);

  return (
    <Weiweb3ConnectedWalletContext.Provider value={contextValue}>
      {children}
    </Weiweb3ConnectedWalletContext.Provider>
  );
};

export function useWeiweb3ConnectedWalletContext() {
  return useContext(Weiweb3ConnectedWalletContext);
}
