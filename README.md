# BLS Key Generation

![npm (tag)](https://img.shields.io/npm/v/@chainsafe/bls-keygen/latest)
[![Discord](https://img.shields.io/discord/593655374469660673.svg?label=Discord&logo=discord)](https://discord.gg/aMxzVcr)
![GitHub](https://img.shields.io/github/license/chainsafe/bls-keygen)

Utility functions for generating BLS secret keys, built for NodeJs and Browser.

Create a master key from BIP-39 mnemonic or entropy.
Create a derived child key from BIP-39 mnemonic, entropy, or a master key.
Create Eth2 validator keys from a master key.

Implementation follows EIPS: [EIP-2334](https://github.com/ethereum/EIPs/pull/2334), [EIP-2333](https://github.com/ethereum/EIPs/pull/2333)

For low-level [EIP-2333](https://github.com/ethereum/EIPs/pull/2333) and [EIP-2334](https://github.com/ethereum/EIPs/pull/2334) functionality, see [@chainsafe/bls-hd-key](https://github.com/chainsafe/bls-hd-key).

### Examples
```typescript


import {
    generateRandomSecretKey,
    deriveKeyFromMnemonic,
    deriveKeyFromEntropy,
    deriveKeyFromMaster,
    deriveEth2ValidatorKeys,
} from "@chainsafe/bls-keygen";

// random secret key
const secretKey = generateRandomSecretKey();

...

// secret key from mnemonic and optional EIP-2334 path
const masterSecretKey = deriveKeyFromMnemonic(
  "impact exit example acquire drastic cement usage float mesh source private bulb twenty guitar neglect",
);

const childSecretKey = deriveKeyFromMnemonic(
  "impact exit example acquire drastic cement usage float mesh source private bulb twenty guitar neglect",
  "m/12381/3600/0/0"
);

...

// secret key from entropy and optional EIP-2334 path
const masterSecretKey = deriveKeyFromEntropy(entropy);

const childSecretKey = deriveKeyFromEntropy(
  entropy,
  "m/12381/3600/0/0"
);


...

// child secret key from master secret key and EIP-2334 path
const childSecretKey = deriveKeyFromMaster(
  masterSecretKey,
  "m/12381/3600/0/0"
);

...

// create multiple eth2 validator keys from a master secret key
const keys0 = deriveEth2ValidatorKeys(masterSecretKey, 0);
const keys1 = deriveEth2ValidatorKeys(masterSecretKey, 1);

const { signing, withdrawal } = keys0;

```

### Contribution

Requirements:
- nodejs
- yarn

```bash
    yarn install
    yarn run test
```

### License

Apache-2.0
