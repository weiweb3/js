<p align="center">
<br />
<a href="https://weiweb3.com"><img src="https://github.com/weiweb3/js/blob/main/packages/sdk/logo.svg?raw=true" width="200" alt=""/></a>
<br />
</p>
<h1 align="center">weiweb3 Solana SDK</h1>
<p align="center">
<a href="https://discord.gg/weiweb3"><img alt="Join our Discord!" src="https://img.shields.io/discord/834227967404146718.svg?color=7289da&label=discord&logo=discord&style=flat"/></a>

</p>
<p align="center"><strong>weiweb3's Solana SDK for Browser, Node and React Native</strong></p>
<br />

## Installation

Install the latest version of the SDK with either `npm` or `yarn`:

```shell
npm install @weiweb3/sdk
```

```shell
yarn add @weiweb3/sdk
```

## Quick Start

The first thing to do to get started with Solana using weiweb3 is to deploy a program. You can do this via the [Dashboard](https://weiweb3.com/dashboard), or via the SDK with the following snippet:

```jsx
import { Weiweb3SDK } from "@weiweb3/sdk/solana";

// First, we instantiate the SDK and connect to Solana devnet
const sdk = Weiweb3SDK.fromNetwork("devnet");

// Next, we pass in a keypair to the SDK (you can generate this or use your own)
// You can also generate one, using Kepair.generate() from @solana/web3.js
const keypair = Keypair.fromSecretKey(...)
sdk.wallet.connect(keypair);

// Finally, we can deploy a new NFT Collection program
const address = await sdk.deployer.createNftCollection({
  name: "My Collection",
});
```

Once we have a deployed program, we can access it using the SDK to read and write data to the program:

```jsx
// Here, we pass in the address of our deployed program
const program = await sdk.getNFTCollection(address);

// And now we can read data off our program, like getting all the NFTs from our collection
const nfts = await program.getAll();

// Or we can write data/send transactions to our program, like minting a new NFT
const mintAddress = await program.mint({
  name: "New NFT",
});
const nft = await program.get(mintAddress);
```

## Learn More

You can learn more about weiweb3 and the Solana SDK with the following resources:

- [Solana Docs](https://portal.weiweb3.com/solana)
- [Weiweb3 Twitter](https://twitter.com/weiweb3_)
- [Weiweb3 Discord](https://discord.com/invite/weiweb3)
