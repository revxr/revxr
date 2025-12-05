import { analyzeToken } from "../src/scanner/core.js";

describe("analyzeToken", () => {
  it("returns a report with a score", async () => {
    const report = await analyzeToken({
      mint: "So11111111111111111111111111111111111111112",
      holders: [{ amount: 100 }, { amount: 50 }, { amount: 25 }],
      pairs: [{ liquidityUsd: 10_000 }],
    });
    expect(report.mint).toBe("So11111111111111111111111111111111111111112");
    expect(typeof report.score).toBe("number");
    expect(report.axes).toBeDefined();
  });

  it("handles empty holders without throwing", async () => {
    const report = await analyzeToken({
      mint: "x",
      holders: [],
      pairs: [],
    });
    expect(report.score).toBeGreaterThanOrEqual(0);
  });
});
