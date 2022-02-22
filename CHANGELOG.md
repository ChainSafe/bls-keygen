## 0.4.0 (2022-02-22)

### BREAKING CHANGES

* Update dependencies - Replace `Buffer` with `Uint8Array` in public APIs [#30](https://github.com/ChainSafe/bls-keygen/pull/30)

## 0.3.0 (2020-11-06)

### BREAKING CHANGES

* update bls-hd-key ([0febb0](https://github.com/chainsafe/bls-keygen/commit/0febb0))

## 0.2.1 (2020-08-11)

### Features

* Add `eth2ValidatorPaths` ([482bc6](https://github.com/chainsafe/bls-keygen/commit/482bc6))

## 0.2.0 (2020-07-30)

### BREAKING CHANGES

* update bls-hd-key ([f9f561](https://github.com/chainsafe/bls-keygen/commit/f9f561))

## 0.1.0 (2020-01-24) 

### BREAKING CHANGES

`deriveKey`
* renamed `deriveKeyFromEntropy`
* default path to `undefined` (master key)

`mnemonicToSecretKey`
* renamed `deriveKeyFromMnemonic`
* default path to `undefined` (master key)

### Features

* add `deriveKeyFromMaster` to derive a child key from a master key
* add `deriveEth2ValidatorKeys` to derive eth2 signing and withdrawal keys from a master key

