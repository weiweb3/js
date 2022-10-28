import { createSOLProgramQueryKey } from "../../../core/query-utils/query-key";
import {
  requiredParamInvariant,
  RequiredParam,
} from "../../../core/query-utils/required-param";
import { useQuery } from "@tanstack/react-query";
import type { NFTCollection, NFTDrop } from "@weiweb3/sdk/solana";

export function nftGetAllQuery(
  program: RequiredParam<NFTCollection | NFTDrop>,
) {
  return {
    queryKey: createSOLProgramQueryKey(program, ["getAll"] as const),

    queryFn: async () => {
      requiredParamInvariant(program, "program is required");
      return await program.getAll();
    },
    enabled: !!program,
  };
}

/**
 * Get the metadata for every NFT on an NFT program
 * @param program - The NFT program to get NFTs metadata from
 *
 * @example
 * ```jsx
 * import { useProgram, useNFTs } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { data: metadata, isLoading } = useNFTs(program);
 *
 *   return (
 *     <pre>{JSON.stringify(metadata)}</pre>
 *   )
 * }
 * ```
 *
 * @public
 */
export function useNFTs(program: RequiredParam<NFTCollection | NFTDrop>) {
  return useQuery(nftGetAllQuery(program));
}
