import {Buffer} from "buffer";
// @ts-ignore
import {HKDF, SHA256} from "bcrypto";

export function getHkdf(ikm: Buffer, length: number, salt: Buffer) {
    const bIKM = Buffer.from(ikm);
    const info = Buffer.alloc(0);
    const prk = HKDF.extract(SHA256, bIKM, salt);
    return HKDF.expand(SHA256, prk, info, length);
}