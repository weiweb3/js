import { _ as _defineProperty } from '../../../../dist/defineProperty-fe02f37c.esm.js';
import { u as useConnect } from '../../../../dist/useConnect-4d8e7937.esm.js';
import { ethers, utils } from 'ethers';
import invariant from 'tiny-invariant';
import { Connector, normalizeChainId, useContext } from 'wagmi';

const CHAIN_ID_TO_GNOSIS_SERVER_URL = {
  // mainnet
  1: "https://safe-transaction.mainnet.gnosis.io",
  // avalanche
  43114: "https://safe-transaction.avalanche.gnosis.io",
  // polygon
  137: "https://safe-transaction.polygon.gnosis.io",
  // goerli
  5: "https://safe-transaction.goerli.gnosis.io"
};

const __IS_SERVER__ = typeof window === "undefined";

class GnosisSafeConnector extends Connector {
  // config
  constructor(config) {
    var _config$chains;

    // filter out any chains that gnosis doesnt support before passing to connector
    config.chains = (_config$chains = config.chains) === null || _config$chains === void 0 ? void 0 : _config$chains.filter(c => c.id in CHAIN_ID_TO_GNOSIS_SERVER_URL);
    super({ ...config,
      options: undefined
    });

    _defineProperty(this, "id", "gnosis");

    _defineProperty(this, "ready", __IS_SERVER__);

    _defineProperty(this, "name", "Gnosis Safe");

    _defineProperty(this, "previousConnector", void 0);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "safeSigner", void 0);

    if (!__IS_SERVER__) {
      this.ready = true;
    }
  }

  async connect() {
    this.safeSigner = await this.createSafeSigner();
    const account = await this.getAccount();
    const provider = await this.getProvider();
    const id = await this.getChainId();
    return {
      account,
      provider,
      chain: {
        id,
        unsupported: this.isChainUnsupported(id)
      }
    };
  }

  async createSafeSigner() {
    var _this$previousConnect, _this$config, _this$config2;

    const signer = await ((_this$previousConnect = this.previousConnector) === null || _this$previousConnect === void 0 ? void 0 : _this$previousConnect.getSigner());
    const safeAddress = (_this$config = this.config) === null || _this$config === void 0 ? void 0 : _this$config.safeAddress;
    const safeChainId = (_this$config2 = this.config) === null || _this$config2 === void 0 ? void 0 : _this$config2.safeChainId;
    invariant(signer, "cannot create Gnosis Safe signer without a personal signer");
    const signerChainId = await signer.getChainId();
    invariant(signerChainId === safeChainId, "chainId of personal signer has to match safe chainId");
    invariant(safeAddress, "safeConfig.safeAddress is required, did you forget to call setSafeConfig?");
    invariant(safeChainId, "safeConfig.safeChainId is required, did you forget to call setSafeConfig?");
    const serverUrl = CHAIN_ID_TO_GNOSIS_SERVER_URL[safeChainId];
    invariant(serverUrl, "Chain not supported");
    const [safeEthersAdapters, safeCoreSdk, safeEthersLib] = await Promise.all([import('@gnosis.pm/safe-ethers-adapters'), import('@gnosis.pm/safe-core-sdk'), import('@gnosis.pm/safe-ethers-lib')]);
    const ethAdapter = new safeEthersLib.default({
      ethers,
      signer
    });
    const safe = await safeCoreSdk.default.create({
      ethAdapter: ethAdapter,
      safeAddress
    });
    const service = new safeEthersAdapters.SafeService(serverUrl);
    return new safeEthersAdapters.SafeEthersSigner(safe, service, signer.provider);
  }

  async disconnect() {
    this.config = undefined;
    this.safeSigner = undefined;
    this.previousConnector = undefined;
    return undefined;
  }

  async getAccount() {
    const signer = await this.getSigner();
    return await signer.getAddress();
  }

  async getChainId() {
    return (await this.getSigner()).getChainId();
  }

  async getProvider() {
    return (await this.getSigner()).provider;
  }

  async getSigner() {
    if (!this.safeSigner) {
      this.safeSigner = await this.createSafeSigner();
    }

    return this.safeSigner;
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }

  onAccountsChanged(accounts) {
    if (accounts.length === 0) {
      this.emit("disconnect");
    } else {
      this.emit("change", {
        account: utils.getAddress(accounts[0])
      });
    }
  }

  isChainUnsupported(chainId) {
    var _this$config3;

    return (_this$config3 = this.config) !== null && _this$config3 !== void 0 && _this$config3.safeChainId ? chainId === this.config.safeChainId : false;
  }

  onChainChanged(chainId) {
    const id = normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit("change", {
      chain: {
        id,
        unsupported
      }
    });
  }

  onDisconnect() {
    this.emit("disconnect");
  }

  setConfiguration(connector, config) {
    this.previousConnector = connector;
    this.config = config;
  }

}
/**
 * Hook for connecting to a Gnosis Safe. This enables multisig wallets to connect to your application and sing transactions.
 *
 * ```javascript
 * import { useGnosis } from "@weiweb3/react"
 * ```
 *
 *
 * @example
 * ```javascript
 * import { useGnosis } from "@weiweb3/react"
 *
 * const App = () => {
 *   const connectWithGnosis = useGnosis()
 *
 *   return (
 *     <button onClick={() => connectWithGnosis({ safeAddress: "0x...", safeChainId: 1 })}>
 *       Connect Gnosis Safe
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */

function useGnosis() {
  const wagmiContext = useContext();
  invariant(wagmiContext, `useGnosis() can only be used inside <Weiweb3Provider />. If you are using <Weiweb3SDKProvider /> you will have to use your own wallet-connection logic.`);
  const [connectors, connect] = useConnect();

  if (connectors.loading) {
    return () => Promise.reject("Gnosis connector not ready to be used, yet");
  }

  const connector = connectors.data.connectors.find(c => c.id === "gnosis");
  invariant(connector, "Gnosis connector not found, please make sure it is provided to your <Weiweb3Provider />");
  return async config => {
    const previousConnector = connectors.data.connector;
    const previousConnectorChain = await (previousConnector === null || previousConnector === void 0 ? void 0 : previousConnector.getChainId());
    invariant(!!previousConnector, "Cannot connect to Gnosis Safe without first being connected to a personal wallet.");
    invariant(previousConnectorChain === config.safeChainId, "Gnosis safe chain id must match personal wallet chain id.");
    invariant(utils.isAddress(config.safeAddress), "Gnosis safe address must be a valid address.");
    connector.setConfiguration(previousConnector, config);
    return connect(connector);
  };
}

export { GnosisSafeConnector, useGnosis };
