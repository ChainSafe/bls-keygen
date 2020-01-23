import {randomBytes} from "bcrypto/lib/random";
import {mnemonicToSeedSync, validateMnemonic} from "bip39";
import assert from "assert";
import {Buffer} from "buffer";
import {deriveChildSKMultiple, deriveMasterSK, pathToIndices} from "@chainsafe/bls-hd-key";

/**
 *
 * @param entropy optional additional entropy
 */
export function generateRandomSecretKey(entropy?: Buffer): Buffer {
  let ikm = randomBytes(16);
  if(entropy) {
    ikm = Buffer.concat([entropy, ikm]);
  }
  return deriveKeyFromEntropy(ikm);
}

/**
 * Derive a secret key from a BIP39 mnemonic seed and optionally an EIP-2334 path.
 * If path is included, the derived key will be the child secret key at that path,
 * otherwise, the derived key will be the master secret key
 */
export function deriveKeyFromMnemonic(mnemonic: string, path?: string): Buffer {
  assert(validateMnemonic(mnemonic), "invalid mnemonic");
  const ikm = Buffer.from(mnemonicToSeedSync(mnemonic));
  return deriveKeyFromEntropy(ikm, path);
}

/**
 * Derive a secret key from entropy and optionally an EIP-2334 path.
 * If path is included, the derived key will be the child secret key at that path,
 * otherwise, the derived key will be the master secret key
 */
export function deriveKeyFromEntropy(entropy: Buffer, path?: string): Buffer {
  const masterKey = deriveMasterSK(Buffer.from(entropy));
  if(path) {
    return deriveKeyFromMaster(masterKey, path);
  }
  return masterKey;
}

/**
 * Derive a child secret key from a master secret key
 * @param masterKey master secret key
 * @param path EIP-2334 path to child
 */
export function deriveKeyFromMaster(masterKey: Buffer, path: string): Buffer {
  return deriveChildSKMultiple(masterKey, pathToIndices(path));
}

export interface IEth2ValidatorKeys {
  withdrawal: Buffer;
  signing: Buffer;
}

/**
 * Derive Eth2 validator secret keys from a single master secret key
 * @param masterKey master secret key
 */
export function deriveEth2ValidatorKeys(masterKey: Buffer, validatorIndex: number): IEth2ValidatorKeys {
  return {
    withdrawal: deriveKeyFromMaster(masterKey, `m/12381/3600/${validatorIndex}/0`),
    signing: deriveKeyFromMaster(masterKey, `m/12381/3600/${validatorIndex}/0/0`),
  };
}
