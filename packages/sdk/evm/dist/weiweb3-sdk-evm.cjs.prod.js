'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var paperXyz = require('../../dist/paper-xyz-b4e0db57.cjs.prod.js');
require('zod');
require('../../dist/QueryParams-5acdcd43.cjs.prod.js');
require('bn.js');
require('ethers');
require('@weiweb3/contracts-js/dist/abis/IERC165.json');
require('@weiweb3/contracts-js/dist/abis/IERC721.json');
require('@weiweb3/contracts-js/dist/abis/IERC1155.json');
require('tiny-invariant');
require('eventemitter3');
require('cross-fetch');
require('@weiweb3/contracts-js/dist/abis/Forwarder.json');
require('@weiweb3/contracts-js/dist/abis/IBurnableERC20.json');
require('@weiweb3/contracts-js/dist/abis/IDropSinglePhase.json');
require('@weiweb3/contracts-js/dist/abis/IERC20.json');
require('@weiweb3/contracts-js/dist/abis/IMintableERC20.json');
require('@weiweb3/contracts-js/dist/abis/IMulticall.json');
require('@weiweb3/contracts-js/dist/abis/ISignatureMintERC20.json');
require('@weiweb3/contracts-js/dist/abis/IBurnableERC721.json');
require('@weiweb3/contracts-js/dist/abis/IClaimableERC721.json');
require('@weiweb3/contracts-js/dist/abis/IDelayedReveal.json');
require('@weiweb3/contracts-js/dist/abis/IERC721Enumerable.json');
require('@weiweb3/contracts-js/dist/abis/IERC721Supply.json');
require('@weiweb3/contracts-js/dist/abis/ILazyMint.json');
require('@weiweb3/contracts-js/dist/abis/IMintableERC721.json');
require('@weiweb3/contracts-js/dist/abis/SignatureMintERC721.json');
require('@weiweb3/contracts-js/dist/abis/DelayedReveal.json');
require('@weiweb3/contracts-js/dist/abis/DropSinglePhase1155.json');
require('@weiweb3/contracts-js/dist/abis/IBurnableERC1155.json');
require('@weiweb3/contracts-js/dist/abis/IClaimableERC1155.json');
require('@weiweb3/contracts-js/dist/abis/IERC1155Enumerable.json');
require('@weiweb3/contracts-js/dist/abis/IMintableERC1155.json');
require('@weiweb3/contracts-js/dist/abis/ISignatureMintERC1155.json');
require('bs58');
require('cbor-x');
require('@weiweb3/contracts-js/dist/abis/IERC20Metadata.json');
require('merkletreejs');
require('fast-deep-equal');
require('uuid');
require('@weiweb3/contracts-js/dist/abis/IERC721Metadata.json');
require('@weiweb3/contracts-js/dist/abis/IERC1155Metadata.json');
require('@weiweb3/contracts-js/dist/abis/IDelayedRevealDeprecated.json');
require('@weiweb3/contracts-js/dist/abis/TWFactory.json');
require('@weiweb3/contracts-js/dist/abis/TWRegistry.json');
require('@weiweb3/contracts-js/dist/abis/ContractPublisher.json');
require('@weiweb3/contracts-js/dist/abis/IWeiweb3Contract.json');
require('@weiweb3/storage');
require('@weiweb3/contracts-js/dist/abis/IAppURI.json');
require('@weiweb3/contracts-js/dist/abis/IContractMetadata.json');
require('@weiweb3/contracts-js/dist/abis/IPermissions.json');
require('@weiweb3/contracts-js/dist/abis/IPermissionsEnumerable.json');
require('@weiweb3/contracts-js/dist/abis/IPlatformFee.json');
require('@weiweb3/contracts-js/dist/abis/IPrimarySale.json');
require('@weiweb3/contracts-js/dist/abis/IRoyalty.json');
require('@weiweb3/contracts-js/dist/abis/Ownable.json');

// handle browser vs node global
globalThis.global = globalThis;
 // explcitly export the *TYPES* of prebuilt contracts

exports.ALL_ROLES = paperXyz.ALL_ROLES;
exports.AbiObjectSchema = paperXyz.AbiObjectSchema;
exports.AbiSchema = paperXyz.AbiSchema;
exports.AbiTypeSchema = paperXyz.AbiTypeSchema;
exports.AdminRoleMissingError = paperXyz.AdminRoleMissingError;
exports.AssetNotFoundError = paperXyz.AssetNotFoundError;
exports.AuctionAlreadyStartedError = paperXyz.AuctionAlreadyStartedError;
exports.AuctionHasNotEndedError = paperXyz.AuctionHasNotEndedError;
exports.AuthenticationOptionsSchema = paperXyz.AuthenticationOptionsSchema;
exports.AuthenticationPayloadDataSchema = paperXyz.AuthenticationPayloadDataSchema;
exports.AuthenticationPayloadSchema = paperXyz.AuthenticationPayloadSchema;
exports.BYOCContractMetadataSchema = paperXyz.BYOCContractMetadataSchema;
exports.BaseSignaturePayloadInput = paperXyz.BaseSignaturePayloadInput;
exports.CHAIN_ID_TO_NAME = paperXyz.CHAIN_ID_TO_NAME;
exports.CHAIN_NAME_TO_ID = paperXyz.CHAIN_NAME_TO_ID;
exports.CONTRACTS_MAP = paperXyz.CONTRACTS_MAP;
exports.CONTRACT_ADDRESSES = paperXyz.CONTRACT_ADDRESSES;
Object.defineProperty(exports, 'ChainId', {
  enumerable: true,
  get: function () { return paperXyz.ChainId; }
});
exports.ChainIdToAddressSchema = paperXyz.ChainIdToAddressSchema;
exports.ClaimConditionInputArray = paperXyz.ClaimConditionInputArray;
exports.ClaimConditionInputSchema = paperXyz.ClaimConditionInputSchema;
exports.ClaimConditionOutputSchema = paperXyz.ClaimConditionOutputSchema;
Object.defineProperty(exports, 'ClaimEligibility', {
  enumerable: true,
  get: function () { return paperXyz.ClaimEligibility; }
});
exports.CommonContractOutputSchema = paperXyz.CommonContractOutputSchema;
exports.CommonContractSchema = paperXyz.CommonContractSchema;
exports.CommonPlatformFeeSchema = paperXyz.CommonPlatformFeeSchema;
exports.CommonPrimarySaleSchema = paperXyz.CommonPrimarySaleSchema;
exports.CommonRoyaltySchema = paperXyz.CommonRoyaltySchema;
exports.CommonSymbolSchema = paperXyz.CommonSymbolSchema;
exports.CommonTrustedForwarderSchema = paperXyz.CommonTrustedForwarderSchema;
exports.CompilerMetadataFetchedSchema = paperXyz.CompilerMetadataFetchedSchema;
exports.ContractDeployer = paperXyz.ContractDeployer;
exports.ContractEncoder = paperXyz.ContractEncoder;
exports.ContractEvents = paperXyz.ContractEvents;
exports.ContractInfoSchema = paperXyz.ContractInfoSchema;
exports.ContractInterceptor = paperXyz.ContractInterceptor;
exports.ContractMetadata = paperXyz.ContractMetadata;
exports.ContractOwner = paperXyz.ContractOwner;
exports.ContractPlatformFee = paperXyz.ContractPlatformFee;
exports.ContractPrimarySale = paperXyz.ContractPrimarySale;
exports.ContractPublishedMetadata = paperXyz.ContractPublishedMetadata;
exports.ContractRoles = paperXyz.ContractRoles;
exports.ContractRoyalty = paperXyz.ContractRoyalty;
exports.CurrencySchema = paperXyz.CurrencySchema;
exports.CurrencyValueSchema = paperXyz.CurrencyValueSchema;
exports.CustomContractDeploy = paperXyz.CustomContractDeploy;
exports.CustomContractInput = paperXyz.CustomContractInput;
exports.CustomContractOutput = paperXyz.CustomContractOutput;
exports.CustomContractSchema = paperXyz.CustomContractSchema;
exports.DEFAULT_IPFS_GATEWAY = paperXyz.DEFAULT_IPFS_GATEWAY;
exports.DEFAULT_RPC_URLS = paperXyz.DEFAULT_RPC_URLS;
exports.DelayedReveal = paperXyz.DelayedReveal;
exports.DropClaimConditions = paperXyz.DropClaimConditions;
exports.DropErc1155ClaimConditions = paperXyz.DropErc1155ClaimConditions;
exports.DropErc1155History = paperXyz.DropErc1155History;
exports.DuplicateFileNameError = paperXyz.DuplicateFileNameError;
exports.DuplicateLeafsError = paperXyz.DuplicateLeafsError;
exports.EditionDropInitializer = paperXyz.EditionDropInitializer;
exports.EditionInitializer = paperXyz.EditionInitializer;
exports.EditionMetadataInputOrUriSchema = paperXyz.EditionMetadataInputOrUriSchema;
exports.EditionMetadataInputSchema = paperXyz.EditionMetadataInputSchema;
exports.EditionMetadataOutputSchema = paperXyz.EditionMetadataOutputSchema;
exports.EditionMetadataWithOwnerOutputSchema = paperXyz.EditionMetadataWithOwnerOutputSchema;
exports.Erc1155 = paperXyz.Erc1155;
exports.Erc1155BatchMintable = paperXyz.Erc1155BatchMintable;
exports.Erc1155Burnable = paperXyz.Erc1155Burnable;
exports.Erc1155Enumerable = paperXyz.Erc1155Enumerable;
exports.Erc1155LazyMintable = paperXyz.Erc1155LazyMintable;
exports.Erc1155Mintable = paperXyz.Erc1155Mintable;
exports.Erc1155SignatureMintable = paperXyz.Erc1155SignatureMintable;
exports.Erc20 = paperXyz.Erc20;
exports.Erc20BatchMintable = paperXyz.Erc20BatchMintable;
exports.Erc20Burnable = paperXyz.Erc20Burnable;
exports.Erc20Mintable = paperXyz.Erc20Mintable;
exports.Erc20SignatureMintable = paperXyz.Erc20SignatureMintable;
exports.Erc721 = paperXyz.Erc721;
exports.Erc721BatchMintable = paperXyz.Erc721BatchMintable;
exports.Erc721Burnable = paperXyz.Erc721Burnable;
exports.Erc721ClaimableWithConditions = paperXyz.Erc721ClaimableWithConditions;
exports.Erc721Enumerable = paperXyz.Erc721Enumerable;
exports.Erc721LazyMintable = paperXyz.Erc721LazyMintable;
exports.Erc721Mintable = paperXyz.Erc721Mintable;
exports.Erc721Supply = paperXyz.Erc721Supply;
exports.Erc721WithQuantitySignatureMintable = paperXyz.Erc721WithQuantitySignatureMintable;
Object.defineProperty(exports, 'EventType', {
  enumerable: true,
  get: function () { return paperXyz.EventType; }
});
exports.ExtensionNotImplementedError = paperXyz.ExtensionNotImplementedError;
exports.ExtraPublishMetadataSchemaInput = paperXyz.ExtraPublishMetadataSchemaInput;
exports.ExtraPublishMetadataSchemaOutput = paperXyz.ExtraPublishMetadataSchemaOutput;
exports.FactoryDeploymentSchema = paperXyz.FactoryDeploymentSchema;
exports.FetchError = paperXyz.FetchError;
exports.FileNameMissingError = paperXyz.FileNameMissingError;
exports.FullPublishMetadataSchemaInput = paperXyz.FullPublishMetadataSchemaInput;
exports.FullPublishMetadataSchemaOutput = paperXyz.FullPublishMetadataSchemaOutput;
exports.FunctionDeprecatedError = paperXyz.FunctionDeprecatedError;
exports.GasCostEstimator = paperXyz.GasCostEstimator;
exports.InterfaceId_IERC1155 = paperXyz.InterfaceId_IERC1155;
exports.InterfaceId_IERC721 = paperXyz.InterfaceId_IERC721;
exports.InvalidAddressError = paperXyz.InvalidAddressError;
exports.ListingNotFoundError = paperXyz.ListingNotFoundError;
Object.defineProperty(exports, 'ListingType', {
  enumerable: true,
  get: function () { return paperXyz.ListingType; }
});
exports.LoginOptionsSchema = paperXyz.LoginOptionsSchema;
exports.LoginPayloadDataSchema = paperXyz.LoginPayloadDataSchema;
exports.LoginPayloadSchema = paperXyz.LoginPayloadSchema;
exports.MarketplaceAuction = paperXyz.MarketplaceAuction;
exports.MarketplaceDirect = paperXyz.MarketplaceDirect;
exports.MarketplaceInitializer = paperXyz.MarketplaceInitializer;
exports.MerkleSchema = paperXyz.MerkleSchema;
exports.MintRequest1155 = paperXyz.MintRequest1155;
exports.MintRequest20 = paperXyz.MintRequest20;
exports.MintRequest721 = paperXyz.MintRequest721;
exports.MintRequest721withQuantity = paperXyz.MintRequest721withQuantity;
exports.MissingOwnerRoleError = paperXyz.MissingOwnerRoleError;
exports.MissingRoleError = paperXyz.MissingRoleError;
exports.MultiwrapInitializer = paperXyz.MultiwrapInitializer;
exports.NATIVE_TOKENS = paperXyz.NATIVE_TOKENS;
exports.NATIVE_TOKEN_ADDRESS = paperXyz.NATIVE_TOKEN_ADDRESS;
exports.NFTCollectionInitializer = paperXyz.NFTCollectionInitializer;
exports.NFTDropInitializer = paperXyz.NFTDropInitializer;
exports.NotEnoughTokensError = paperXyz.NotEnoughTokensError;
exports.NotFoundError = paperXyz.NotFoundError;
exports.OZ_DEFENDER_FORWARDER_ADDRESS = paperXyz.OZ_DEFENDER_FORWARDER_ADDRESS;
exports.OptionalPropertiesInput = paperXyz.OptionalPropertiesInput;
exports.PAPER_API_URL = paperXyz.PAPER_API_URL;
exports.PREBUILT_CONTRACTS_MAP = paperXyz.PREBUILT_CONTRACTS_MAP;
exports.PackInitializer = paperXyz.PackInitializer;
exports.PaperCheckout = paperXyz.PaperCheckout;
exports.PartialClaimConditionInputSchema = paperXyz.PartialClaimConditionInputSchema;
exports.PreDeployMetadata = paperXyz.PreDeployMetadata;
exports.PreDeployMetadataFetchedSchema = paperXyz.PreDeployMetadataFetchedSchema;
exports.ProfileSchemaInput = paperXyz.ProfileSchemaInput;
exports.ProfileSchemaOutput = paperXyz.ProfileSchemaOutput;
Object.defineProperty(exports, 'ProposalState', {
  enumerable: true,
  get: function () { return paperXyz.ProposalState; }
});
exports.PublishedContractSchema = paperXyz.PublishedContractSchema;
exports.QuantityAboveLimitError = paperXyz.QuantityAboveLimitError;
exports.RestrictedTransferError = paperXyz.RestrictedTransferError;
exports.SUPPORTED_CHAIN_IDS = paperXyz.SUPPORTED_CHAIN_IDS;
exports.Signature1155PayloadInput = paperXyz.Signature1155PayloadInput;
exports.Signature1155PayloadInputWithTokenId = paperXyz.Signature1155PayloadInputWithTokenId;
exports.Signature1155PayloadOutput = paperXyz.Signature1155PayloadOutput;
exports.Signature20PayloadInput = paperXyz.Signature20PayloadInput;
exports.Signature20PayloadOutput = paperXyz.Signature20PayloadOutput;
exports.Signature721PayloadInput = paperXyz.Signature721PayloadInput;
exports.Signature721PayloadOutput = paperXyz.Signature721PayloadOutput;
exports.Signature721WithQuantityInput = paperXyz.Signature721WithQuantityInput;
exports.Signature721WithQuantityOutput = paperXyz.Signature721WithQuantityOutput;
exports.SignatureDropInitializer = paperXyz.SignatureDropInitializer;
exports.SnapshotEntryInput = paperXyz.SnapshotEntryInput;
exports.SnapshotInfoSchema = paperXyz.SnapshotInfoSchema;
exports.SnapshotInputSchema = paperXyz.SnapshotInputSchema;
exports.SnapshotSchema = paperXyz.SnapshotSchema;
exports.SplitInitializer = paperXyz.SplitInitializer;
exports.StandardErc1155 = paperXyz.StandardErc1155;
exports.StandardErc20 = paperXyz.StandardErc20;
exports.StandardErc721 = paperXyz.StandardErc721;
exports.TokenDropInitializer = paperXyz.TokenDropInitializer;
exports.TokenERC20History = paperXyz.TokenERC20History;
exports.TokenInitializer = paperXyz.TokenInitializer;
exports.TokenMintInputSchema = paperXyz.TokenMintInputSchema;
exports.TransactionError = paperXyz.TransactionError;
exports.TransactionTask = paperXyz.TransactionTask;
exports.UploadError = paperXyz.UploadError;
exports.UserWallet = paperXyz.UserWallet;
exports.VerifyOptionsSchema = paperXyz.VerifyOptionsSchema;
exports.VoteInitializer = paperXyz.VoteInitializer;
Object.defineProperty(exports, 'VoteType', {
  enumerable: true,
  get: function () { return paperXyz.VoteType; }
});
exports.WalletAuthenticator = paperXyz.WalletAuthenticator;
exports.Weiweb3SDK = paperXyz.Weiweb3SDK;
exports.WrongListingTypeError = paperXyz.WrongListingTypeError;
exports.assertEnabled = paperXyz.assertEnabled;
exports.convertToTWError = paperXyz.convertToTWError;
exports.createCheckoutLinkIntent = paperXyz.createCheckoutLinkIntent;
exports.createSnapshot = paperXyz.createSnapshot;
exports.detectContractFeature = paperXyz.detectContractFeature;
exports.detectFeatures = paperXyz.detectFeatures;
exports.extractConstructorParams = paperXyz.extractConstructorParams;
exports.extractConstructorParamsFromAbi = paperXyz.extractConstructorParamsFromAbi;
exports.extractEventsFromAbi = paperXyz.extractEventsFromAbi;
exports.extractFunctionParamsFromAbi = paperXyz.extractFunctionParamsFromAbi;
exports.extractFunctions = paperXyz.extractFunctions;
exports.extractFunctionsFromAbi = paperXyz.extractFunctionsFromAbi;
exports.extractIPFSHashFromBytecode = paperXyz.extractIPFSHashFromBytecode;
exports.fetchContractMetadata = paperXyz.fetchContractMetadata;
exports.fetchContractMetadataFromAddress = paperXyz.fetchContractMetadataFromAddress;
exports.fetchExtendedReleaseMetadata = paperXyz.fetchExtendedReleaseMetadata;
exports.fetchPreDeployMetadata = paperXyz.fetchPreDeployMetadata;
exports.fetchRawPredeployMetadata = paperXyz.fetchRawPredeployMetadata;
exports.fetchRegisteredCheckoutId = paperXyz.fetchRegisteredCheckoutId;
exports.fetchSourceFilesFromMetadata = paperXyz.fetchSourceFilesFromMetadata;
exports.getContractAddressByChainId = paperXyz.getContractAddressByChainId;
exports.getContractPublisherAddress = paperXyz.getContractPublisherAddress;
exports.getContractTypeForRemoteName = paperXyz.getContractTypeForRemoteName;
exports.getNativeTokenByChainId = paperXyz.getNativeTokenByChainId;
exports.getProviderForNetwork = paperXyz.getProviderForNetwork;
exports.getReadOnlyProvider = paperXyz.getReadOnlyProvider;
exports.getRoleHash = paperXyz.getRoleHash;
exports.hasFunction = paperXyz.hasFunction;
exports.hashLeafNode = paperXyz.hashLeafNode;
exports.includesErrorMessage = paperXyz.includesErrorMessage;
exports.isDowngradeVersion = paperXyz.isDowngradeVersion;
exports.isFeatureEnabled = paperXyz.isFeatureEnabled;
exports.isIncrementalVersion = paperXyz.isIncrementalVersion;
exports.parseChainIdToPaperChain = paperXyz.parseChainIdToPaperChain;
exports.resolveContractUriFromAddress = paperXyz.resolveContractUriFromAddress;
exports.toSemver = paperXyz.toSemver;
