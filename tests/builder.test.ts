import { buildRevivalTx } from "../src/reviver/builder.js";

describe("buildRevivalTx", () => {
  it("tags payloads with a memo by default", () => {
    const out = buildRevivalTx({
      payer: "Alice",
      recipient: "Bob",
      lamports: 1_000_000,
    });
    expect(out.kind).toBe("unsigned");
    expect(out.memo).toMatch(/revival/);
  });

  it("rejects non-positive lamports", () => {
    expect(() =>
      buildRevivalTx({ payer: "a", recipient: "b", lamports: 0 }),
    ).toThrow();
  });
});
