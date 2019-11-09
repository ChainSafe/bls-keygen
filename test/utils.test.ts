import {assertValidPath} from "../src/utils";
import { expect } from "chai";

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

});