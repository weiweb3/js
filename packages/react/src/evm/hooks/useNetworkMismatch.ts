import { useDesiredChainId } from "../providers/base";
import { useChainId } from "./wallet";

/**
 * Hook for checking whether the connected wallet is on the correct network specified by the `desiredChainId` passed to the `<Weiweb3Provider />`.
 *
 * ```javascript
 * import { useNetworkMistmatch } from "@weiweb3/react"
 * ```
 *
 * @returns `true` if the chainId of the connected wallet is different from the desired chainId passed into <Weiweb3Provider />
 *
 * @example
 * You can check if a users wallet is connected to the correct chain ID as follows:
 * ```javascript
 * import { useNetworkMismatch } from "@weiweb3/react"
 *
 * const App = () => {
 *   const isMismatched = useNetworkMismatch()
 *
 *   return <div>{isMismatched}</div>
 * }
 * ```
 *
 * From here, you can prompt users to switch their network using the `useNetwork` hook.
 *
 * @public
 */
export function useNetworkMismatch() {
  const desiredChainId = useDesiredChainId();
  const walletChainId = useChainId();

  if (desiredChainId === -1) {
    // means no desiredChainId is set in the <Weiweb3Provider />, so we don't care about the network mismatch
    return false;
  }
  if (!walletChainId) {
    // means no wallet is connected yet, so we don't care about the network mismatch
    return false;
  }
  // check if the chainIds are different
  return desiredChainId !== walletChainId;
}
