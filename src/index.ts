import {deriveChildSK, deriveMasterSK} from "./key-derivation";
import {randomBytes} from "bcrypto/lib/random";
import {mnemonicToSeedSync, validateMnemonic} from "bip39";
import assert from "assert";
import {Buffer} from "buffer";
import {pathToIndices} from "./utils";

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

export function mnemonicToSecretKey(mnemonic: string, path: string | null = "m/12381/60/0/0"): Buffer {
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
export function deriveKey(seed: Buffer, path: string | null = "m/12381/60/0/0"): Buffer {
  const masterKey = deriveMasterSK(Buffer.from(seed));
  if(path) {
    return pathToIndices(path).reduce(
      (parent, index) => {
        return deriveChildSK(parent, index);
      },
      masterKey
    );
  }
  return masterKey;
}