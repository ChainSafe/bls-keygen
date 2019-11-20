import {assertValidPath, pathToIndices} from "../src/utils";
import { expect } from "chai";
import BN from "bn.js";

describe("utils", function () {

    describe("validate path", function () {

        it("should not be valid", function () {
            expect(() => assertValidPath("a/12381/60/0/0")).to.throw();
            expect(() => assertValidPath("m/12382/60/0/0")).to.throw();
            expect(() => assertValidPath("m/12381/60'/0/0")).to.throw();
            expect(() => assertValidPath("m/12381/60'/0")).to.throw();
        });

        it("should be valid", function () {
            expect(() => assertValidPath("m/12381/60/0/0")).to.not.throw();
            expect(() => assertValidPath("m/12381/90/0/0")).to.not.throw();
            expect(() => assertValidPath("m/12381/90/1/12010124124124124124124124124")).to.not.throw();
        })

    });

    describe("path to indices", function () {

        it("should convert", function () {
            const indices = pathToIndices("m/12381/60/0/1111111111111111111111111111111111111111111111111");
            expect(indices.length).to.be.equal(4);
            expect(indices[0].eqn(12381)).to.be.true;
            expect(indices[1].eqn(60)).to.be.true;
            expect(indices[2].eqn(0)).to.be.true;
            expect(indices[3].eq(new BN("1111111111111111111111111111111111111111111111111"))).to.be.true;
        });

    });

});