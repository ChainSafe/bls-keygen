import {deriveMasterSK} from "./key-derivation";
// @ts-ignore
import secureRandom from "secure-random";
import {mnemonicToSeedSync, validateMnemonic} from "bip39";
import assert from "assert";
import {HDNode} from "./hdnode";
import {Buffer} from "buffer";

export function generateRandomBLSSecretKey(entropy?: Buffer): Buffer {
    let ikm = secureRandom(16, {type: "Buffer"});
    if(entropy) {
        ikm = Buffer.concat([entropy, ikm]);
    }
    return deriveMasterSK(ikm);
}

export function fromMnemonicToBlsSecretKey(mnemonic: string, path = "m/12381/60/0/0"): Buffer {
    assert(validateMnemonic(mnemonic), "invalid mnemonic");
    const ikm = Buffer.from(mnemonicToSeedSync(mnemonic));
    const masterKey = deriveMasterSK(ikm);
    if(path) {
        return HDNode.derivePath(masterKey, path);
    }
    return masterKey
}