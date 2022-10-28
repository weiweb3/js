import { MediaRenderer, SharedMediaProps } from "./MediaRenderer";
import { NFTMetadata } from "@weiweb3/sdk";
import React from "react";

/**
 * The props for the {@link Weiweb3NftMedia} component.
 */
export interface Weiweb3NftMediaProps extends SharedMediaProps {
  /**
   * The NFT metadata of the NFT returned by the weiweb3 sdk.
   */
  metadata: NFTMetadata;
}

/**
 * This component can be used to render NFTs from the weiweb3 SDK.
 * Props: {@link Weiweb3NftMediaProps}
 * 
 * @example
 * ```jsx
 * import { Weiweb3NftMedia, useContract, useNFT } from "@weiweb3/react";
 * export default function NFTCollectionRender() {
 *   const { contract } = useContract(<your-contract-address>);
 *   const { data: nft, isLoading } = useNFT(contract, 0);
 *
 *   return (
 *     <div>
 *       {!isLoading && nft ? (
 *         <Weiweb3NftMedia metadata={nft.metadata} />
 *       ) : (
 *         <p>Loading...</p>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export const Weiweb3NftMedia = React.forwardRef<
  HTMLMediaElement,
  Weiweb3NftMediaProps
>(({ metadata, ...props }, ref) => {
  return (
    <MediaRenderer
      src={metadata.animation_url || metadata.image}
      poster={metadata.image}
      alt={metadata.name?.toString() || ""}
      ref={ref}
      {...props}
    />
  );
});

Weiweb3NftMedia.displayName = "Weiweb3NftMedia";
