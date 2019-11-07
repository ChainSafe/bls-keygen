import {Buffer} from "buffer";
import {HKDF, SHA256} from "bcrypto";

export function _hkdf(ikm: Buffer, length: number, salt: string|Buffer) {
  
    // todo: convert the ikm codec 
    // const bIKM = Buffer.from(codec.hex.fromBits(IKM), 'hex')
  
    const bIKM = Buffer.from(ikm);
    const info = Buffer.alloc(0);
    if (typeof salt === "string") {
        const prk = HKDF.extract(SHA256, bIKM, salt);
        const bOKM = HKDF.expand(SHA256, prk, info, length);
   
        // todo convert to bits?
        // return codec.hex.toBits(bOKM.toString('hex'))
        return bOKM;
    } else {
        const bSalt = Buffer.from(salt);
        const prk = HKDF.extract(SHA256, bIKM, bSalt);
        const bOKM = HKDF.expand(SHA256, prk, info, length);
     
        // todo convert to bits?
        // return codec.hex.toBits(bOKM.toString('hex'))
        return bOKM;
    }
}