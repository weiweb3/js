<p align="center">
<br />
<a href="https://weiweb3.com"><img src="https://github.com/weiweb3/js/blob/main/packages/sdk/logo.svg?raw=true" width="200" alt=""/></a>
<br />
</p>
<h1 align="center">weiweb3 CLI</h1>
<p align="center">
<a href="https://www.npmjs.com/package/@weiweb3/cli"><img src="https://img.shields.io/npm/v/@weiweb3/cli?color=red&logo=npm" alt="npm version"/></a>
<a href="https://discord.gg/weiweb3"><img alt="Join our Discord!" src="https://img.shields.io/discord/834227967404146718.svg?color=7289da&label=discord&logo=discord&style=flat"/></a>

</p>
<p align="center"><strong>Publish and deploy smart contracts without dealing with private keys</strong></p>
<br />

## Getting started

The weiweb3 CLI is your one-stop-shop for publishing custom contracts for your team or the world to use. The CLI uploads all necessary data to decentralized storage and makes it available to deploy via the weiweb3 sdk or weiweb3 dashboard.

This brings all the capabilities of weiweb3 to your own custom contracts.

## Deploying your contract

```shell
npx weiweb3@latest deploy
```

This command will:

- auto-detect any contracts in your project
- compile your project
- Upload ABIs to IPFS
- Open the deploy flow in your weiweb3 dashboard in a browser

From the weiweb3 dashboard, you can review and deploy your contracts on any supported EVM chain.

Deploying contracts this way gives you access to:

- auto generated SDKs for react, node, python, go
- dashboards to manage, monitor and interact with your contracts

## Releasing your contract

```shell
npx weiweb3@latest release
```

Creates an official release of your contract, along with:

- author attribution
- contract information
- instructions on how to use and what it's for
- versioning
- release notes

Creating releases this way gives you shareable URL to let others to deploy your contracts in one click. It lets you manage released versions and get attribution for deployed contracts. Contract releases are registered on-chain (Polygon) and IPFS, for free (gasless).

Deploying released contracts give deployers access to automatic SDKs to integrate into their app and dashboards to manage and monitor the deployed contracts.

## Detecting contract extensions

```shell
npx weiweb3@latest detect
```

As you're developing your contracts, you may want to implement [Extensions](https://portal.weiweb3.com/extensions) to unlock functionality on the SDKs (ie. nft minting with automatic upload to IPFS) and the dashboard (ie. generated UI to manage permissions). This command will show what extensions were detected on your contract, unlocking the corresponding functionality on the SDKs and dashboard.

---

## Global installation

We recommend using npx to always get the latest version. Alternatively, you can install the CLI as a global command on your machine:

```shell
npm i -g @weiweb3/cli
```

---

## Supported projects

To publish, you need to be in a directory that contains a project which the CLI is compatible
with. The projects we support so far:

- hardhat
- forge
- truffle
- solc

---

## Running the examples

Clone the repo and run this command after installing the CLI tool:

```bash
$ cd examples/hardhat
$ npx weiweb3@latest release
```

## Local Development

The simplest way to work on the CLI locally is to:

1. Install the package locally
2. Run the `build:watch` command to compile any changes in realtime

```bash
$ npm install -g ./
$ yarn run build:watch
```
