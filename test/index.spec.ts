import {deriveKeyFromMnemonic, generateRandomSecretKey, deriveKeyFromEntropy} from "../src";
import {expect} from "chai";
import {generateMnemonic} from "bip39";

describe("random private key", function () {

  it("should generate with given entropy", function () {
    const key = generateRandomSecretKey(Buffer.alloc(32)).toString("hex");
    const key1 = generateRandomSecretKey(Buffer.alloc(32)).toString("hex");
    expect(key).to.not.be.equal(key1);
  });

  it("should generate without given entropy", function () {
    const key = generateRandomSecretKey().toString("hex");
    const key1 = generateRandomSecretKey().toString("hex");
    expect(key).to.not.be.equal(key1);
  });

});

describe("private key from mnemonic", function () {

  it("should generate master key", function () {
    const mnemonic = generateMnemonic();
    const key = deriveKeyFromMnemonic(mnemonic);
    const key1 = deriveKeyFromMnemonic(mnemonic);
    expect(key).to.not.be.null;
    expect(key.toString("hex")).to.be.equal(key1.toString("hex"));
  });

  it("should generate using given path", function () {
    const mnemonic = generateMnemonic();
    const key = deriveKeyFromMnemonic(mnemonic, "m/12381/3600/0/1");
    const key1 = deriveKeyFromMnemonic(mnemonic, "m/12381/3600/0/2");
    expect(key).to.not.be.null;
    expect(key.toString("hex")).to.not.be.equal(key1.toString("hex"));
  });

});

describe("private key from entropy", function () {

  it("should generate master key", function () {
    const seed = Buffer.alloc(32, 1);
    const key = deriveKeyFromEntropy(seed);
    const key1 = deriveKeyFromEntropy(seed);
    expect(key).to.not.be.null;
    expect(key.toString("hex")).to.be.equal(key1.toString("hex"));
  });

  it("should generate child key using given path", function () {
    const seed = Buffer.alloc(32, 2);
    const key = deriveKeyFromEntropy(seed, "m/12381/3600/0/1");
    const key1 = deriveKeyFromEntropy(seed, "m/12381/3600/0/2");
    expect(key).to.not.be.null;
    expect(key.toString("hex")).to.not.be.equal(key1.toString("hex"));
  });

});
