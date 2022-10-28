'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var requiredParam = require('../../dist/required-param-5dc2d492.cjs.prod.js');
var React = require('react');
var jsxRuntime = require('react/jsx-runtime');
var solana = require('@weiweb3/sdk/solana');
var invariant = require('tiny-invariant');
var walletAdapterPhantom = require('@solana/wallet-adapter-phantom');
var walletAdapterReact = require('@solana/wallet-adapter-react');
var reactQuery = require('@tanstack/react-query');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var invariant__default = /*#__PURE__*/_interopDefault(invariant);

const Weiweb3AuthConfigContext = /*#__PURE__*/React.createContext(undefined);
const Weiweb3AuthConfigProvider = _ref => {
  let {
    value,
    children
  } = _ref;
  // Remove trailing slash from URL if present
  const authConfig = React.useMemo(() => value ? { ...value,
    authUrl: value.authUrl.replace(/\/$/, "")
  } : undefined, [value]);
  return /*#__PURE__*/jsxRuntime.jsx(Weiweb3AuthConfigContext.Provider, {
    value: authConfig,
    children: children
  });
};
function useWeiweb3AuthConfig() {
  return React.useContext(Weiweb3AuthConfigContext);
}

/**
 * Gives access to the Weiweb3SDK instance and other useful hooks to the rest of the app.
 * Requires to be wrapped with a ConnectionProvider and a WalletProvider from @solana/wallet-adapter-react.
 * @example
 * ```tsx
 * import { useWallet } from "@solana/wallet-adapter-react";
 * import { Weiweb3Provider } from "@weiweb3/react/solana";
 *
 * const Weiweb3App = () => {
 *  const wallet = useWallet();
 *  return (
 *    <Weiweb3SDKProvider network={"devnet"} wallet={wallet}>
 *      <YourApp />
 *    </Weiweb3SDKProvider>
 * )};
 * ```
 */
const Weiweb3SDKProvider = _ref => {
  let {
    children,
    network,
    queryClient,
    wallet,
    authConfig
  } = _ref;
  const [sdk, setSDK] = React.useState(null);
  React.useEffect(() => {
    if (network) {
      const _sdk = solana.Weiweb3SDK.fromNetwork(network);

      if (wallet && wallet.publicKey) {
        _sdk.wallet.connect(wallet);
      }

      _sdk._network = network;
      setSDK(_sdk);
    } else {
      setSDK(null);
    } // disabled wallet on purpose because we handle that below
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [network]);
  React.useEffect(() => {
    if (wallet && wallet.publicKey && sdk && sdk._network === network) {
      sdk.wallet.connect(wallet);
      return;
    }
  }, [network, sdk, wallet]);
  const ctxValue = React.useMemo(() => ({
    sdk,
    desiredNetwork: network || "unknown",
    _inProvider: true
  }), [sdk, network]);
  return /*#__PURE__*/jsxRuntime.jsx(requiredParam.QueryClientProviderWithDefault, {
    queryClient: queryClient,
    children: /*#__PURE__*/jsxRuntime.jsx(Weiweb3AuthConfigProvider, {
      value: authConfig,
      children: /*#__PURE__*/jsxRuntime.jsx(Weiweb3SDKContext.Provider, {
        value: ctxValue,
        children: children
      })
    })
  });
};
const Weiweb3SDKContext = /*#__PURE__*/React.createContext({
  sdk: null,
  desiredNetwork: "unknown"
});
function useSDK() {
  const ctxValue = React.useContext(Weiweb3SDKContext);
  invariant__default["default"](ctxValue._inProvider, "useSDK must be used within a Weiweb3SDKProvider");

  if (!ctxValue.sdk || ctxValue.sdk._network !== ctxValue.desiredNetwork) {
    return null;
  }

  return ctxValue.sdk;
}

const DEFAULT_WALLETS = [new walletAdapterPhantom.PhantomWalletAdapter()];
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

const Weiweb3Provider = _ref => {
  let {
    network,
    wallets = DEFAULT_WALLETS,
    autoConnect = true,
    authConfig,
    children
  } = _ref;
  const clusterUrl = solana.getUrlForNetwork(network);
  return /*#__PURE__*/jsxRuntime.jsx(walletAdapterReact.ConnectionProvider, {
    endpoint: clusterUrl,
    children: /*#__PURE__*/jsxRuntime.jsx(walletAdapterReact.WalletProvider, {
      wallets: wallets,
      autoConnect: autoConnect,
      children: /*#__PURE__*/jsxRuntime.jsx(Weiweb3WrapperProvider, {
        network: network,
        authConfig: authConfig,
        children: children
      })
    })
  });
};
/**
 * @internal
 */

const Weiweb3WrapperProvider = _ref2 => {
  let {
    network,
    authConfig,
    children
  } = _ref2;
  const wallet = walletAdapterReact.useWallet();
  return /*#__PURE__*/jsxRuntime.jsx(Weiweb3SDKProvider, {
    network: network,
    wallet: wallet,
    authConfig: authConfig,
    children: children
  });
};

function programAccountTypeQuery(sdk, address) {
  const network = sdk === null || sdk === void 0 ? void 0 : sdk.network;
  return {
    queryKey: requiredParam.createSOLQueryKeyWithNetwork(["program", address, "type"], network || null),
    queryFn: async () => {
      requiredParam.requiredParamInvariant(sdk, "sdk is required");
      requiredParam.requiredParamInvariant(address, "Address is required");
      return await sdk.registry.getProgramType(address);
    },
    enabled: !!sdk && !!network && !!address,
    // this cannot change as it is unique by address & network
    cacheTime: Infinity,
    staleTime: Infinity
  };
}
/**
 * @internal
 */

function useProgramAccountType(address) {
  const sdk = useSDK();
  return reactQuery.useQuery(programAccountTypeQuery(sdk, address));
}

function programQuery(queryClient, sdk, address, type) {
  const network = sdk === null || sdk === void 0 ? void 0 : sdk.network;
  return {
    queryKey: requiredParam.neverPersist(requiredParam.createSOLQueryKeyWithNetwork(["program-instance", address], network || null)),
    queryFn: async () => {
      requiredParam.requiredParamInvariant(sdk, "sdk is required");
      requiredParam.requiredParamInvariant(address, "Address is required"); // if the type is not passed in explicitly then we'll try to resolve it

      if (!type) {
        // why do we call `fetchQuery` here instead of calling the sdk directly?
        // while we can never persist the program itself to the cache we can persist the type!
        // (and this will be triggered by fetching the query on the queryClient)
        type = await queryClient.fetchQuery(programAccountTypeQuery(sdk, address));
      }

      switch (type) {
        case "nft-collection":
          return await sdk.getNFTCollection(address);

        case "nft-drop":
          return await sdk.getNFTDrop(address);

        case "token":
          return await sdk.getToken(address);

        default:
          throw new Error("Unknown account type");
      } // this is the magic that makes the type inference work

    },
    enabled: !!sdk && !!network && !!address,
    // this cannot change as it is unique by address & network
    cacheTime: Infinity,
    staleTime: Infinity
  };
}
/**
 * Get an SDK instance to interact with any program
 * @param address - the address of the program to get an interface for
 * @param type - optionally, pass in the program type to get static typing
 *
 * @example
 * ```jsx
 * import { useProgram } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}").program;
 *
 *   // Now you can use the program in the rest of the component
 *
 *   // For example, we can make a transaction
 *   async function functionCall() {
 *     await program.call("mint", ...);
 *   }
 *
 *   ...
 * }
 * ```
 *
 * @public
 */

function useProgram(address, type) {
  const queryClient = reactQuery.useQueryClient();
  const sdk = useSDK();
  const queryResult = reactQuery.useQuery(programQuery(queryClient, sdk, address, type));
  return { ...queryResult,
    program: queryResult.data
  };
}

function programMetadataQuery(program) {
  return {
    queryKey: requiredParam.createSOLProgramQueryKey(program || null, ["metadata"]),
    queryFn: async () => {
      invariant__default["default"](program, "sdk is required");
      return await program.getMetadata();
    },
    enabled: !!program
  };
}
/**
 * @internal
 */

function useProgramMetadata(program) {
  return reactQuery.useQuery(programMetadataQuery(program));
}

function nftGetAllQuery(program) {
  return {
    queryKey: requiredParam.createSOLProgramQueryKey(program, ["getAll"]),
    queryFn: async () => {
      requiredParam.requiredParamInvariant(program, "program is required");
      return await program.getAll();
    },
    enabled: !!program
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

function useNFTs(program) {
  return reactQuery.useQuery(nftGetAllQuery(program));
}

/**
 * Transfer NFTs from the connected wallet to another wallet
 * @param program - The NFT program instance to transfer NFTs on
 *
 * @example
 * ```jsx
 * import { useProgram, useTransferNFT } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { mutateAsync: transfer, isLoading, error } = useTransferNFT(program);
 *
 *   return (
 *     <button
 *       onClick={() => transfer({
 *         receiverAddress: "{{wallet_address}}",
 *         tokenAddress: "..."
 *       })}
 *     >
 *       Transfer
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */
function useTransferNFT(program) {
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async _ref => {
    let {
      tokenAddress,
      receiverAddress
    } = _ref;
    requiredParam.requiredParamInvariant(program, "program is required");
    return await program.transfer(receiverAddress, tokenAddress);
  }, {
    onSettled: () => queryClient.invalidateQueries(requiredParam.createSOLProgramQueryKey(program))
  });
}

/**
 * Burn an NFT owned by the connected wallet
 * @param program - The NFT program instance to burn NFTs on
 *
 * @example
 * ```jsx
 * import { useProgram, useBurnNFT } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { mutateAsync: burn, isLoading, error } = useBurnNFT(program);
 *
 *   return (
 *     <button
 *       onClick={() => burn("...")}
 *     >
 *       Burn
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */
function useBurnNFT(program) {
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async nftAddress => {
    requiredParam.requiredParamInvariant(program, "program is required");
    return await program.burn(nftAddress);
  }, {
    onSettled: () => queryClient.invalidateQueries(requiredParam.createSOLProgramQueryKey(program))
  });
}

function nftRoyaltyQuery(program) {
  return {
    queryKey: requiredParam.createSOLProgramQueryKey(program, ["royalty"]),
    queryFn: async () => {
      requiredParam.requiredParamInvariant(program, "program is required");
      return await program.getRoyalty();
    },
    enabled: !!program
  };
}
/**
 * Get the royalty for an NFT program
 * @param program - The NFT program to get the royalty for
 *
 * @example
 * ```jsx
 * import { useProgram, useRoyalty } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { data: royalty, isLoading } = useRoyaltySettings(program);
 *
 *   return (
 *     <p>{royalty}</p>
 *   )
 * }
 * ```
 *
 * @public
 */

function useRoyaltySettings(program) {
  return reactQuery.useQuery(nftRoyaltyQuery(program));
}

/**
 * Update the royalty for an NFT program
 * @param program - The NFT program instance to update the royalty for
 *
 * @example
 * ```jsx
 * import { useProgram, useUpdateRoyaltySettings } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { mutateAsync: updateRoyalties, isLoading, error } = useUpdateRoyaltySettings(program);
 *
 *   return (
 *     <button
 *       onClick={() => updateRoyalties(300)}
 *     >
 *       Update Royalties
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */
function useUpdateRoyaltySettings(program) {
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async sellerFeeBasisPoints => {
    requiredParam.requiredParamInvariant(program, "program is required");
    return await program.updateRoyalty(sellerFeeBasisPoints);
  }, {
    onSettled: () => queryClient.invalidateQueries(requiredParam.createSOLProgramQueryKey(program))
  });
}

/**
 * Mint NFTs on your NFT program
 * @param program - The NFT program to mint NFTs to
 *
 * @example
 * ```jsx
 * import { useProgram, useMintNFT } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { mutateAsync: mintNFT, isLoading, error } = useMintNFT(program);
 *
 *   return (
 *     <button onClick={() => mintNFT({ metadata: { name: "First NFT" } })}>
 *       Mint
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */

function useMintNFT(program) {
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](program, "program is required");

    if (!data.to) {
      return await program.mint(data.metadata);
    }

    return await program.mintTo(data.to, data.metadata);
  }, {
    onSettled: () => queryClient.invalidateQueries(requiredParam.createSOLProgramQueryKey(program))
  });
}

/**
 * Mint additional supply for an NFT on your NFT program
 * @param program - The NFT program to mint additional NFTs to
 *
 * @example
 * ```jsx
 * import { useProgram, useMintNFTSupply } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { mutateAsync: mintSupply, isLoading, error } = useMintNFTSupply(program);
 *
 *   return (
 *     <button onClick={() => mintSupply({ nftAddress: "111...", amount: 10 })}>
 *       Mint Additional Supply
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */
function useMintNFTSupply(program) {
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async data => {
    requiredParam.requiredParamInvariant(program, "program is required");

    if (!data.to) {
      return await program.mintAdditionalSupply(data.nftAddress, data.amount);
    }

    return await program.mintAdditionalSupplyTo(data.to, data.nftAddress, data.amount);
  }, {
    onSettled: () => queryClient.invalidateQueries(requiredParam.createSOLProgramQueryKey(program))
  });
}

/**
 * Lazy mint NFTs on an NFT Drop program
 * @param program - The NFT Drop program instance to lazy mint on
 *
 * @example
 * ```jsx
 * import { useProgram, useLazyMintNFT } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { mutateAsync: lazyMint, isLoading, error } = useLazyMintNFT(program);
 *
 *   return (
 *     <button onClick={() => lazyMint({ name: "My NFT", description: "..." })}>
 *       Claim
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */
function useLazyMint(program, onProgress) {
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async data => {
    requiredParam.requiredParamInvariant(program, "program is required");
    let options;

    if (onProgress) {
      options = {
        onProgress
      };
    }

    return await program.lazyMint(data.metadatas, options);
  }, {
    onSettled: () => queryClient.invalidateQueries(requiredParam.createSOLProgramQueryKey(program))
  });
}

function dropTotalClaimedSupplyQuery(program) {
  return {
    queryKey: requiredParam.createSOLProgramQueryKey(program, ["totalClaimedSupply"]),
    queryFn: async () => {
      requiredParam.requiredParamInvariant(program, "program is required");
      return await program.totalClaimedSupply();
    },
    enabled: !!program
  };
}
/**
 * Get the total claimed supply of NFTs on an NFT Drop
 * @param program - The NFT Drop program to get the claimed supply on
 *
 * @example
 * ```jsx
 * import { useProgram, useDropTotalClaimedSupply } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { data: claimedSupply, isLoading } = useDropTotalClaimedSupply(program);
 *
 *   return (
 *     <p>{claimedSupply}</p>
 *   )
 * }
 * ```
 *
 * @public
 */

function useDropTotalClaimedSupply(program) {
  return reactQuery.useQuery(dropTotalClaimedSupplyQuery(program));
}

function dropUnclaimedSupplyQuery(program) {
  return {
    queryKey: requiredParam.createSOLProgramQueryKey(program, ["totalUnclaimedSupply"]),
    queryFn: async () => {
      requiredParam.requiredParamInvariant(program, "program is required");
      return await program.totalUnclaimedSupply();
    },
    enabled: !!program
  };
}
/**
 * Get the total unclaimed supply of NFTs on an NFT Drop
 * @param program - The NFT Drop program to get the unclaimed supply on
 *
 * @example
 * ```jsx
 * import { useProgram, useDropTotalUnclaimedSupply } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { data: unclaimedSupply, isLoading } = useDropTotalUnclaimedSupply(program);
 *
 *   return (
 *     <p>{unclaimedSupply}</p>
 *   )
 * }
 * ```
 *
 * @public
 */

function useDropUnclaimedSupply(program) {
  return reactQuery.useQuery(dropUnclaimedSupplyQuery(program));
}

/**
 * Claim NFTs from an NFT Drop program
 * @param program - The NFT Drop program instance to claim from
 *
 * @example
 * ```jsx
 * import { useProgram, useClaimNFT } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { mutateAsync: claim, isLoading, error } = useClaimNFT(program);
 *
 *   return (
 *     <button onClick={() => claim({amount: 1})}>
 *       Claim
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */

function useClaimNFT(program) {
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](program, "program is required");

    if (!data.to) {
      return await program.claim(data.amount);
    }

    return await program.claimTo(data.to, data.amount);
  }, {
    onSettled: () => queryClient.invalidateQueries(requiredParam.createSOLProgramQueryKey(program))
  });
}

function claimConditionsQuery(program) {
  return {
    queryKey: requiredParam.createSOLProgramQueryKey(program, ["claimConditions"]),
    queryFn: async () => {
      invariant__default["default"](program, "program is required");
      return await program.claimConditions.get();
    },
    enabled: !!program
  };
}
/**
 * Get the current claim conditions on an NFT Drop
 * @param program - The NFT Drop program to get the claim conditions for
 *
 * @example
 * ```jsx
 * import { useProgram, useClaimConditions } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { data: claimConditions, isLoading } = useClaimConditions(program);
 *
 *   return (
 *     <p>{claimConditions?.price.displayValue}</p>
 *   )
 * }
 * ```
 *
 * @public
 */

function useClaimConditions(program) {
  return reactQuery.useQuery(claimConditionsQuery(program));
}

/**
 * Set Claim Conditions to an NFT Drop program
 * @param program - The NFT Drop program to set claim conditions for
 *
 * @example
 * ```jsx
 * import { useProgram, useSetClaimConditions } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { mutateAsync: setClaimConditions, isLoading, error } = useSetClaimConditions(program);
 *
 *   return (
 *     <button onClick={() => setClaimConditions(metadata)}>
 *       Set Claim Conditions
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */

function useSetClaimConditions(program) {
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async metadata => {
    invariant__default["default"](program, "program is required");
    return await program.claimConditions.set(metadata);
  }, {
    onSettled: () => queryClient.invalidateQueries(requiredParam.createSOLProgramQueryKey(program))
  });
}

function tokenSupplyQuery(program) {
  return {
    queryKey: requiredParam.createSOLProgramQueryKey(program, ["totalSupply"]),
    queryFn: async () => {
      invariant__default["default"](program, "program is required");
      return await program.totalSupply();
    },
    enabled: !!program
  };
}
/**
 * Get the total circulating supply of a token
 * @param program - The token program to get the supply of
 *
 * @example
 * ```jsx
 * import { useProgram, useMintToken } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { data: totalSupply, isLoading } = useTokenSupply(program);
 *
 *   return (
 *     <p>{totalSupply}</p>
 *   )
 * }
 * ```
 *
 * @public
 */

function useTokenSupply(program) {
  return reactQuery.useQuery(tokenSupplyQuery(program));
}

function tokenBalanceQuery(program, walletAddress) {
  return {
    queryKey: requiredParam.createSOLProgramQueryKey(program, ["balanceOf", {
      walletAddress
    }]),
    queryFn: async () => {
      requiredParam.requiredParamInvariant(program, "program is required");
      requiredParam.requiredParamInvariant(walletAddress, "Wallet address is required");
      return await program.balanceOf(walletAddress);
    },
    enabled: !!program && !!walletAddress
  };
}
/**
 * Get the token balance of a specified wallet
 * @param program - The token program to get the balance on
 * @param walletAddress - The address of the wallet to get the balance of
 *
 * @example
 * ```jsx
 * import { useProgram, useTokenBalance } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { data: balance, isLoading } = useTokenBalance(program, "{{wallet_address}}");
 *
 *   return (
 *     <p>{balance}</p>
 *   )
 * }
 * ```
 *
 * @public
 */

function useTokenBalance(program, walletAddress) {
  return reactQuery.useQuery(tokenBalanceQuery(program, walletAddress));
}

/**
 * Mint tokens on your token program
 * @param program - The program instance of the program to mint on
 *
 * @example
 * ```jsx
 * import { useProgram, useMintToken } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { mutateAsync: mint, isLoading, error } = useMintToken(program);
 *
 *   return (
 *     <button onClick={() => mint({ to: "{{wallet_address}}", amount: 1 })}>
 *       Mint
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */
function useMintToken(program) {
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async params => {
    requiredParam.requiredParamInvariant(program, "program is required"); // TODO switch this to use mintTo once that is exposed

    return await program.mint(params.amount);
  }, {
    onSettled: () => queryClient.invalidateQueries(requiredParam.createSOLProgramQueryKey(program))
  });
}

/**
 * Transfer tokens from the connected wallet to another wallet
 * @param program - The program instance of the program to mint on
 *
 * @example
 * ```jsx
 * import { useProgram, useTransferToken } from "@weiweb3/react/solana";
 *
 * export default function Component() {
 *   const { program } = useProgram("{{program_address}}");
 *   const { mutateAsync: transfer, isLoading, error } = useTransferToken(program);
 *
 *   return (
 *     <button onClick={() => transfer({ to: "{{wallet_address}}", amount: 1 })}>
 *       Transfer
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */
function useTransferToken(program) {
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async _ref => {
    let {
      amount,
      receiverAddress
    } = _ref;
    requiredParam.requiredParamInvariant(program, "program is required");
    return await program.transfer(receiverAddress, amount);
  }, {
    onSettled: () => queryClient.invalidateQueries(requiredParam.createSOLProgramQueryKey(program))
  });
}

/**
 * Hook to securely login to a backend with the connected wallet. The backend
 * authentication URL must be configured on the Weiweb3Provider.
 *
 * @param config - Configuration for the login.
 * @returns - A function to invoke to login with the connected wallet.
 *
 * @beta
 */
function useLogin(config) {
  const sdk = useSDK();
  const queryClient = reactQuery.useQueryClient();
  const authConfig = useWeiweb3AuthConfig();
  React__default["default"].useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get("error");

    if (error && config !== null && config !== void 0 && config.onError) {
      // If there is an error, parse it and trigger the onError callback
      config.onError(decodeURI(error));
    }
  }, [config]);

  async function login(cfg) {
    invariant__default["default"](authConfig, "Please specify an authConfig in the Weiweb3Provider");
    const payload = await (sdk === null || sdk === void 0 ? void 0 : sdk.auth.login(authConfig.domain, cfg));
    const encodedPayload = encodeURIComponent(btoa(JSON.stringify(payload)));
    const encodedRedirectTo = encodeURIComponent((config === null || config === void 0 ? void 0 : config.redirectTo) || authConfig.loginRedirect || window.location.toString());
    queryClient.invalidateQueries(requiredParam.ensureTWPrefix(["user"])); // Redirect to the login URL with the encoded payload

    window.location.href = `${authConfig.authUrl}/login?payload=${encodedPayload}&redirect=${encodedRedirectTo}`;
  }

  return login;
}

/**
 * Hook to logout the connected wallet from the backend.
 * The backend logout URL must be configured on the Weiweb3Provider.
 *
 * @returns - A function to invoke to logout.
 *
 * @beta
 */

function useLogout() {
  const queryClient = reactQuery.useQueryClient();
  const authConfig = useWeiweb3AuthConfig();

  function logout() {
    invariant__default["default"](authConfig, "Please specify an authConfig in the Weiweb3Provider");
    queryClient.invalidateQueries(requiredParam.ensureTWPrefix(["user"]));
    window.location.href = `${authConfig.authUrl}/logout`;
  }

  return logout;
}

/**
 * Hook to get the currently logged in user.
 *
 * @returns - The currently logged in user or null if not logged in, as well as a loading state.
 *
 * @beta
 */
function useUser() {
  const authConfig = useWeiweb3AuthConfig();
  const {
    data: user,
    isLoading
  } = reactQuery.useQuery(requiredParam.ensureTWPrefix(["user"]), async () => {
    invariant__default["default"](authConfig, "Please specify an authConfig in the Weiweb3Provider");
    const res = await fetch(`${authConfig.authUrl}/user`);
    return await res.json();
  }, {
    enabled: !!authConfig
  });
  return {
    user,
    isLoading
  };
}

/**
 *
 * @returns
 * @internal
 */

function useAuth(loginConfig) {
  const user = useUser();
  const login = useLogin(loginConfig);
  const logout = useLogout();
  return { ...user,
    login,
    logout
  };
}

function balanceQuery(sdk) {
  var _sdk$wallet;

  const address = sdk === null || sdk === void 0 ? void 0 : (_sdk$wallet = sdk.wallet) === null || _sdk$wallet === void 0 ? void 0 : _sdk$wallet.getAddress();
  const network = sdk === null || sdk === void 0 ? void 0 : sdk.network;
  return {
    queryKey: requiredParam.createSOLQueryKeyWithNetwork(["wallet-balance", {
      address
    }], network),
    queryFn: () => {
      invariant__default["default"](sdk, "sdk is required");
      return sdk.wallet.getBalance();
    },
    enabled: !!sdk && !!address && !!network
  };
}
/**
 * Get the currently connected wallet balance
 *
 * @returns the balace of the connected wallet
 */

function useBalance() {
  const sdk = useSDK();
  return reactQuery.useQuery(balanceQuery(sdk));
}

exports.Weiweb3Provider = Weiweb3Provider;
exports.Weiweb3SDKProvider = Weiweb3SDKProvider;
exports.Weiweb3WrapperProvider = Weiweb3WrapperProvider;
exports.balanceQuery = balanceQuery;
exports.claimConditionsQuery = claimConditionsQuery;
exports.dropTotalClaimedSupplyQuery = dropTotalClaimedSupplyQuery;
exports.dropUnclaimedSupplyQuery = dropUnclaimedSupplyQuery;
exports.nftGetAllQuery = nftGetAllQuery;
exports.nftRoyaltyQuery = nftRoyaltyQuery;
exports.programAccountTypeQuery = programAccountTypeQuery;
exports.programMetadataQuery = programMetadataQuery;
exports.programQuery = programQuery;
exports.tokenBalanceQuery = tokenBalanceQuery;
exports.tokenSupplyQuery = tokenSupplyQuery;
exports.useAuth = useAuth;
exports.useBalance = useBalance;
exports.useBurnNFT = useBurnNFT;
exports.useClaimConditions = useClaimConditions;
exports.useClaimNFT = useClaimNFT;
exports.useDropTotalClaimedSupply = useDropTotalClaimedSupply;
exports.useDropUnclaimedSupply = useDropUnclaimedSupply;
exports.useLazyMint = useLazyMint;
exports.useLogin = useLogin;
exports.useLogout = useLogout;
exports.useMintNFT = useMintNFT;
exports.useMintNFTSupply = useMintNFTSupply;
exports.useMintToken = useMintToken;
exports.useNFTs = useNFTs;
exports.useProgram = useProgram;
exports.useProgramAccountType = useProgramAccountType;
exports.useProgramMetadata = useProgramMetadata;
exports.useRoyaltySettings = useRoyaltySettings;
exports.useSDK = useSDK;
exports.useSetClaimConditions = useSetClaimConditions;
exports.useTokenBalance = useTokenBalance;
exports.useTokenSupply = useTokenSupply;
exports.useTransferNFT = useTransferNFT;
exports.useTransferToken = useTransferToken;
exports.useUpdateRoyaltySettings = useUpdateRoyaltySettings;
exports.useUser = useUser;
