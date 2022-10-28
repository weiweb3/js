import { useWeiweb3ConnectedWalletContext } from "../contexts/weiweb3-wallet";
import type { Signer } from "ethers";

/**
 *
 * @internal
 */
export function useSigner(): Signer | undefined {
  return useWeiweb3ConnectedWalletContext().signer;
}
