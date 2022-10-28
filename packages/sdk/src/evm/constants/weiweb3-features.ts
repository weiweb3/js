import IAppURI from "@weiweb3/contracts-js/dist/abis/IAppURI.json";
import IContractMetadataAbi from "@weiweb3/contracts-js/dist/abis/IContractMetadata.json";
import IPermissionsAbi from "@weiweb3/contracts-js/dist/abis/IPermissions.json";
import IPermissionsEnumerableAbi from "@weiweb3/contracts-js/dist/abis/IPermissionsEnumerable.json";
import IWeiweb3PlatformFeeAbi from "@weiweb3/contracts-js/dist/abis/IPlatformFee.json";
import IWeiweb3PrimarySaleAbi from "@weiweb3/contracts-js/dist/abis/IPrimarySale.json";
import IWeiweb3RoyaltyAbi from "@weiweb3/contracts-js/dist/abis/IRoyalty.json";
import IOwnableAbi from "@weiweb3/contracts-js/dist/abis/Ownable.json";

export const FEATURE_ROYALTY = {
  name: "Royalty",
  namespace: "royalty",
  docLinks: {
    sdk: "sdk.contractroyalty",
    contracts: "Royalty",
  },
  abis: [IWeiweb3RoyaltyAbi],
  features: {},
} as const;

export const FEATURE_PRIMARY_SALE = {
  name: "PrimarySale",
  namespace: "sales",
  docLinks: {
    sdk: "sdk.contractprimarysale",
    contracts: "PrimarySale",
  },
  abis: [IWeiweb3PrimarySaleAbi],
  features: {},
} as const;

export const FEATURE_PLATFORM_FEE = {
  name: "PlatformFee",
  namespace: "platformFee",
  docLinks: {
    sdk: "sdk.platformfee",
    contracts: "PlatformFee",
  },
  abis: [IWeiweb3PlatformFeeAbi],
  features: {},
} as const;

export const FEATURE_PERMISSIONS_ENUMERABLE = {
  name: "PermissionsEnumerable",
  namespace: "roles",
  docLinks: {
    sdk: "sdk.contractroles",
    contracts: "PermissionsEnumerable",
  },
  abis: [IPermissionsEnumerableAbi],
  features: {},
} as const;

export const FEATURE_PERMISSIONS = {
  name: "Permissions",
  namespace: "roles",
  docLinks: {
    sdk: "sdk.contractroles",
    contracts: "Permissions",
  },
  abis: [IPermissionsAbi],
  features: {
    [FEATURE_PERMISSIONS_ENUMERABLE.name]: FEATURE_PERMISSIONS_ENUMERABLE,
  },
} as const;

export const FEATURE_METADATA = {
  name: "ContractMetadata",
  namespace: "metadata",
  docLinks: {
    sdk: "sdk.contractmetadata",
    contracts: "ContractMetadata",
  },
  abis: [IContractMetadataAbi],
  features: {},
} as const;

export const FEATURE_APPURI = {
  name: "AppURI",
  namespace: "appURI",
  docLinks: {
    sdk: "sdk.appURI",
    contracts: "AppURI",
  },
  abis: [IAppURI],
  features: {},
} as const;

export const FEATURE_OWNER = {
  name: "Ownable",
  namespace: "owner",
  docLinks: {
    sdk: "sdk.owner",
    contracts: "Ownable",
  },
  abis: [IOwnableAbi],
  features: {},
} as const;
