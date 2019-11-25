/* eslint-disable camelcase */
import {expect} from "chai";
import {deriveChildSK, deriveMasterSK} from "../src/key-derivation";
import BN from "bn.js";
import testVectorsJson from "./vectors/test-vectors.json";

interface IKdfTestVector {
  seed: string;
  master_SK: string;
  child_index: string;
  child_SK: string;
}

describe("key derivation", function () {
  const testVectors: IKdfTestVector[] = testVectorsJson.kdf_tests;

  describe("master key derivation", function () {

    testVectors.forEach((testVector, index) => {
      it(`test vector #${index}`, function () {
        const seed = Buffer.from(testVector.seed, "hex");
        const expectedMasterSK = Buffer.from(testVector.master_SK.replace("0x", ""), "hex");
        const masterSK = deriveMasterSK(seed);
        expect(masterSK.toString("hex")).to.be.deep.equal(expectedMasterSK.toString("hex"));
      });
    });

  });

  describe("child key derivation", function () {

    testVectors.forEach((testVector, index) => {
      it(`test vector #${index}`, function () {
        const parentSK = Buffer.from(testVector.master_SK.replace("0x", ""), "hex");
        const index = new BN(testVector.child_index.replace("0x", ""), "hex", "be");
        const expectedChildSK = Buffer.from(testVector.child_SK.replace("0x", ""), "hex");
        const childSK = deriveChildSK(parentSK, index);
        expect(childSK.toString("hex")).to.be.deep.equal(expectedChildSK.toString("hex"));
      });
    });

  });

});