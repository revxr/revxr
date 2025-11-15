import { gini } from "../common/gini.js";
import type { AxisScores } from "./report.js";

const TOP1_PENALTY = 0.6;

export function scoreHolders(holders: { amount: number }[]): number {
  if (holders.length === 0) return 0;
  const sorted = holders.slice().sort((a, b) => b.amount - a.amount);
  const total = sorted.reduce((s, h) => s + h.amount, 0);
  const top1 = total === 0 ? 0 : (sorted[0]?.amount ?? 0) / total;
  const g = gini(sorted.map((h) => h.amount));
  return Math.max(0, 1 - g - TOP1_PENALTY * top1);
}

export function scoreLp(pairs: { liquidityUsd: number }[]): number {
  const total = pairs.reduce((s, p) => s + p.liquidityUsd, 0);
  if (total <= 0) return 0;
  return Math.min(1, Math.log10(total) / 6);
}
