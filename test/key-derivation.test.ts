import * as fs from "fs";
import * as path from "path";
import {expect} from "chai";
import {deriveChildSK, deriveMasterSK} from "../src/key-derivation";
import BN = require("bn.js");

interface KdfTestVector {
    seed: string,
    master_SK: string,
    child_index: string,
    child_SK: string
}

describe("key derivation", function () {

    const testVectors: KdfTestVector[] = JSON.parse(fs.readFileSync(path.join(__dirname, "./vectors/test-vectors.json")).toString()).kdf_tests;

    describe("master key derivation", function () {

        testVectors.forEach((testVector, index) => {
            it(`test vector #${index}`, function () {
                const seed = Buffer.from(testVector.seed, "hex");
                const expectedMasterSK = Buffer.from(testVector.master_SK.replace("0x", ""), "hex");
                const masterSK = deriveMasterSK(seed);
                expect(masterSK.toString("hex")).to.be.deep.equal(expectedMasterSK.toString("hex"));
            })
        })

    });

    describe("child key derivation", function () {

        testVectors.forEach((testVector, index) => {
            it(`test vector #${index}`, function () {
                const parentSK = Buffer.from(testVector.master_SK.replace("0x", ""), "hex");
                const index = new BN(testVector.child_index.replace("0x", ""), 'hex', 'be');
                const expectedChildSK = Buffer.from(testVector.child_SK.replace("0x", ""), "hex");
                const childSK = deriveChildSK(parentSK, index);
                expect(childSK.toString("hex")).to.be.deep.equal(expectedChildSK.toString("hex"));
            })
        })

    });

});