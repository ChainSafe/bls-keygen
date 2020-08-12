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

