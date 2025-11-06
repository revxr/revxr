import type { RevivalReport } from "./report.js";

export async function analyzeToken(input: {
  mint: string;
  holders: { amount: number }[];
  pairs: { liquidityUsd: number }[];
}): Promise<RevivalReport> {
  return { mint: input.mint, score: 0 };
}
