import BN from "bn.js";
import {getHkdf} from "./crypto";
import SHA256 from "bcrypto/lib/sha256";
import {Buffer} from "buffer";

export function deriveMasterSK(ikm: Buffer): Buffer {
    const okm = getHkdf(ikm, 48, Buffer.from("BLS-SIG-KEYGEN-SALT-", "utf-8"));
    const okmBN = new BN(okm, 'hex', 'be');
    const r = new BN("52435875175126190479447740508185965837690552500527637822603658699938581184513");
    return Buffer.from(okmBN.mod(r).toArray("be", 32));
}

export function deriveChildSK(parentSK: Buffer, index: BN): Buffer {
    const compressed_lamport_PK = parentSKToLamportPK(parentSK, index);
    return deriveMasterSK(compressed_lamport_PK)
}

function parentSKToLamportPK(parentSK: Buffer, index: BN): Buffer {
    const salt = index.toBuffer("be", 32);
    const ikm = Buffer.from(parentSK);
    const lamport0 = ikmToLamportSK(ikm, salt);
    const notIkm = Buffer.from(ikm.map((value) => ~value));
    const lamport1 = ikmToLamportSK(notIkm, salt);
    const lamportSK = lamport0.concat(lamport1);
    const lamportPK = lamportSK.map((value) => SHA256.digest(value));
    return SHA256.digest(Buffer.concat(lamportPK));
}

function ikmToLamportSK(ikm: Buffer, salt: Buffer): Buffer[] {
    const okm: Buffer = getHkdf(ikm, 8160, salt);
    return Array.from(new Array(255), (_, i) => okm.slice(i*32, (i+1)*32))
}
