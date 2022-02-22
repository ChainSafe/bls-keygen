import {deriveKeyFromMnemonic, generateRandomSecretKey, deriveKeyFromEntropy} from "../src";
import {generateMnemonic} from "@scure/bip39";
import {wordlist} from "@scure/bip39/wordlists/english";
import {expect} from "chai";

describe("random private key", function () {

  it("should generate with given entropy", function () {
    const key = generateRandomSecretKey(Buffer.alloc(32));
    const key1 = generateRandomSecretKey(Buffer.alloc(32));
    expect(key).to.not.deep.equal(key1);
  });

  it("should generate without given entropy", function () {
    const key = generateRandomSecretKey();
    const key1 = generateRandomSecretKey();
    expect(key).to.not.deep.equal(key1);
  });

});

describe("private key from mnemonic", function () {

  it("should generate master key", function () {
    const mnemonic = generateMnemonic(wordlist);
    const key = deriveKeyFromMnemonic(mnemonic);
    const key1 = deriveKeyFromMnemonic(mnemonic);
    expect(key).to.not.be.null;
    expect(key).to.deep.equal(key1);
  });

  it("should generate using given path", function () {
    const mnemonic = generateMnemonic(wordlist);
    const key = deriveKeyFromMnemonic(mnemonic, "m/12381/3600/0/1");
    const key1 = deriveKeyFromMnemonic(mnemonic, "m/12381/3600/0/2");
    expect(key).to.not.be.null;
    expect(key).to.not.deep.equal(key1);
  });

});

describe("private key from entropy", function () {

  it("should generate master key", function () {
    const seed = Buffer.alloc(32, 1);
    const key = deriveKeyFromEntropy(seed);
    const key1 = deriveKeyFromEntropy(seed);
    expect(key).to.not.be.null;
    expect(key).to.deep.equal(key1);
  });

  it("should generate child key using given path", function () {
    const seed = Buffer.alloc(32, 2);
    const key = deriveKeyFromEntropy(seed, "m/12381/3600/0/1");
    const key1 = deriveKeyFromEntropy(seed, "m/12381/3600/0/2");
    expect(key).to.not.be.null;
    expect(key).to.not.deep.equal(key1);
  });

});
