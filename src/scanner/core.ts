import type { RevivalReport } from "./report.js";
import { computeAxes, AXIS_WEIGHTS, type AxesInput } from "./axes.js";

export interface AnalyzeInput extends AxesInput {
  mint: string;
}

export async function analyzeToken(input: AnalyzeInput): Promise<RevivalReport> {
  const axes = computeAxes(input);
  const score = (Object.keys(axes) as (keyof typeof axes)[]).reduce(
    (s, k) => s + axes[k] * AXIS_WEIGHTS[k],
    0,
  );
  return {
    mint: input.mint,
    score: Math.round(score * 100) / 100,
    axes,
  };
}
