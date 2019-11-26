# BLS TypeScript Key Management

![npm (tag)](https://img.shields.io/npm/v/bls-ts-key-mgmt/latest)
[![Discord](https://img.shields.io/discord/593655374469660673.svg?label=Discord&logo=discord)](https://discord.gg/aMxzVcr)
![GitHub](https://img.shields.io/github/license/chainsafe/bls-ts-key-mgmt)

Utility methods for generating valid BLS keys from random bytes or mnemonic for NodeJs and Browser.

Implementation is following EIPS: [EIP-2334](https://github.com/ethereum/EIPs/pull/2334), [EIP-2333](https://github.com/ethereum/EIPs/pull/2333)

### How to use?
```typescript

//random secret key
import {generateRandomSecretKey, mnemonicToSecretKey} from "bls-ts-key-mgmt";
const secretKey = generateRandomSecretKey();

...

//secret key from mnemonic
const secretKey = mnemonicToSecretKey(
    "impact exit example acquire drastic cement usage float mesh source private bulb twenty guitar neglect",
    "m/12381/60/0/0"    
);
```

### Contribution

Requirements:
- nodejs
- yarn

```bash
    yarn install
    yarn run test
```
