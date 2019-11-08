import BN from "bn.js";
import {getHkdf} from "./crypto";

export function deriveMasterSK(ikm: Buffer): BN {
    const okm = getHkdf(ikm, 48, Buffer.from("BLS-SIG-KEYGEN-SALT-", "utf-8"));
    const okmBN = new BN(okm, 'hex', 'be');
    const r = new BN("52435875175126190479447740508185965837690552500527637822603658699938581184513");
    return okmBN.mod(r);
}