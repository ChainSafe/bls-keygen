import Buffer from "buffer";
import {assertValidPath} from "./utils";
import BN = require("bn.js");
import {deriveChildSK} from "./key-derivation";

export class HDNode {

    public key: Buffer;
    private depth: number;
    private path: string;

    private constructor(key: Buffer, depth: number, path: string) {
       this.key = key;
       this.depth = depth;
       this.path = path;
    }

    private derive(): HDNode {
        if(this.depth === 4) {
            return this;
        }
        const parent = new BN(this.key, "hex");
        const index = this.getIndex(this.path, this.depth + 1);
        return new HDNode(deriveChildSK(parent, index), this.depth + 1, this.path).derive();
    }

    private getIndex(path: string, depth: number): BN {
        try {
            return new BN(this.path.split("/")[this.depth + 1]);
        } catch (e) {
            throw new Error(`Invalid path component #${depth} - not a number`);
        }
    }

    public static derivePath(masterKey: Buffer, path: string): Buffer {
        assertValidPath(path);
        const node = new HDNode(masterKey, 0, path);
        return node.derive().key;
    }

}