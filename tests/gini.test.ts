import { gini } from "../src/common/gini.js";

describe("gini", () => {
  it("returns 0 for an empty set", () => {
    expect(gini([])).toBe(0);
  });

  it("returns 0 when all values are equal", () => {
    expect(gini([1, 1, 1, 1])).toBeCloseTo(0, 5);
  });

  it("returns near 1 for a single large holder", () => {
    const values = [100, ...Array(99).fill(0)];
    expect(gini(values)).toBeGreaterThan(0.9);
  });

  it("returns 0 when sum is 0", () => {
    expect(gini([0, 0, 0])).toBe(0);
  });
});
