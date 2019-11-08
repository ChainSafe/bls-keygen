import {generateRandomPrivateKey} from "../src";
import { expect } from "chai";

describe("random private key", function () {

    it('should generate with given entropy', function () {
        const key = generateRandomPrivateKey(Buffer.alloc(32)).toString("hex");
        const key1 = generateRandomPrivateKey(Buffer.alloc(32)).toString("hex");
        expect(key).to.not.be.equal(key1);
    });

    it('should generate without given entropy', function () {
        const key = generateRandomPrivateKey().toString("hex");
        const key1 = generateRandomPrivateKey().toString("hex");
        expect(key).to.not.be.equal(key1);
    });

});