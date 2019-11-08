import {deriveMasterSK} from "./key-derivation";
// @ts-ignore
import secureRandom from "secure-random";

export function generateRandomPrivateKey(entropy?: Buffer): Buffer {
    let ikm = secureRandom(16, {type: "Buffer"});
    if(entropy) {
        ikm = Buffer.concat([entropy, ikm]);
    }
    return deriveMasterSK(ikm);
}