import {randomBytes} from "bcrypto/lib/random";
import {mnemonicToSeedSync, validateMnemonic} from "bip39";
import assert from "assert";
import {Buffer} from "buffer";
import {deriveMasterSK, pathToIndices, deriveChildSK, deriveChildSKMultiple} from "@chainsafe/bls-hd-key";

/**
 *
 * @param entropy optional additional entropy
 */
export function generateRandomSecretKey(entropy?: Buffer): Buffer {
  let ikm = randomBytes(16);
  if(entropy) {
    ikm = Buffer.concat([entropy, ikm]);
  }
  return deriveKey(ikm, null);
}

export function mnemonicToSecretKey(mnemonic: string, path: string | null = "m/12381/3600/0/0"): Buffer {
  assert(validateMnemonic(mnemonic), "invalid mnemonic");
  const ikm = Buffer.from(mnemonicToSeedSync(mnemonic));
  return deriveKey(ikm, path);
}

/**
 * Derive child key from seed and path.
 * If path is omitted seed will be converted to valid secret key
 * @param seed
 * @param path
 */
export function deriveKey(seed: Buffer, path: string | null = "m/12381/3600/0/0"): Buffer {
  const masterKey = deriveMasterSK(Buffer.from(seed));
  if(path) {
    return deriveChildSKMultiple(masterKey, pathToIndices(path));
  }
  return masterKey;
}