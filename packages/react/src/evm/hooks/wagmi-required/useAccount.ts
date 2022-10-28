import invariant from "tiny-invariant";
import {
  useAccount as useWagmiAccount,
  useContext as useWagmiContext,
} from "wagmi";

/**
 * @internal
 */
export function useAccount() {
  const wagmiContext = useWagmiContext();
  invariant(
    wagmiContext,
    `useNetwork() can only be used inside <Weiweb3Provider />. If you are using <Weiweb3SDKProvider /> you will have to use your own network logic.`,
  );
  return useWagmiAccount();
}
