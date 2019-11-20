import {Buffer} from "buffer";
import SHA256 from "bcrypto/lib/sha256";
import HKDF from "bcrypto/lib/hkdf";

export function getHkdf(ikm: Buffer, length: number, salt: Buffer): Buffer {
    const bIKM = Buffer.from(ikm);
    const info = Buffer.alloc(0);
    const prk = HKDF.extract(SHA256, bIKM, salt);
    return HKDF.expand(SHA256, prk, info, length);
}