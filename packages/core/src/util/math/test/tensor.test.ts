import { expect } from "chai";
import { Tensor, Direction } from "..";
import "mocha";

describe("Tensor", () => {
    const tensor1 = Tensor.VECTOR_ZERO.clone();
    it("tensor 1 should equal 0, 0, 0", () => {
        expect(tensor1.toString()).to.equal("0,0,0");
    });

    const tensor2 = tensor1.clone().offsetDir(3, Direction.DOWN);
    it("tensor 2 should be offsetted to 0, -3, 0", () => {
        expect(tensor2.y).to.equal(-3);
        expect(tensor2.x).to.equal(0);
        expect(tensor2.z).to.equal(0);
    });

    it("tensor 1 should NOT be equal to tensor 2", () => {
        expect(tensor1).to.not.equal(tensor2);
    });
});
