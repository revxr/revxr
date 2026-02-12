import type { RevivalReport } from "./report.js";
import { computeAxes, AXIS_WEIGHTS, type AxesInput } from "./axes.js";

export interface AnalyzeInput extends AxesInput {
  mint: string;
}

/**
 * Analyze a mint and return a Revival Report.
 * This module never calls an RPC directly; callers are expected to pass
 * snapshots (holders, pairs, activity) in. Production adapters live elsewhere.
 */
export async function analyzeToken(input: AnalyzeInput): Promise<RevivalReport> {
  const axes = computeAxes(input);
  const score = (Object.keys(axes) as (keyof typeof axes)[]).reduce(
    (s, k) => s + axes[k] * AXIS_WEIGHTS[k],
    0,
  );
  const notes: string[] = [];
  if (input.holders.length < 50) notes.push("holder set is small; gini noisy");
  if (input.pairs.length === 0) notes.push("no liquidity pairs supplied");
  return {
    mint: input.mint,
    score: Math.round(score * 10000) / 10000,
    axes,
    notes: notes.length ? notes : undefined,
  };
}
