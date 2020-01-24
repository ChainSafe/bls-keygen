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

