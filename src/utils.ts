import assert from "assert";

export function assertValidPath(path: string): void {
    const components = path.split("/");
    assert(components.length === 5, "path should contain 5 parts separated by '/'");
    assert(path.indexOf("'") === -1, "path should not contain \"'\" symbols because it's not using hardened keys");
    assert(components[0] === "m", "first component should be \"m\" - root of tree");
    assert(components[1] === "12381", "purpose should be '12381' - bls12-381");
}