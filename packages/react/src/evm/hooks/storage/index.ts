import { useSDK } from "../../providers/base";

export * from "./useStorageUpload";

/**
 * Get the configured `Weiweb3Storage` instance
 * @returns The `storageInterface` configured on the `Weiweb3Provider`
 */
export function useStorage() {
  const sdk = useSDK();
  return sdk?.storage;
}
