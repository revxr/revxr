import { gini } from "../common/gini.js";
import type { AxisScores } from "./report.js";

export const AXIS_WEIGHTS: AxisScores = {
  holders: 0.25,
  lp: 0.20,
  activity: 0.15,
  community: 0.15,
  governance: 0.15,
  cost: 0.10,
};

const TOP1_PENALTY = 0.6;
const ACTIVITY_HALF_LIFE_DAYS = 14;

export interface AxesInput {
  holders: { amount: number }[];
  pairs: { liquidityUsd: number }[];
  lastActivityDaysAgo?: number;
  communityRetention?: number;
  governanceScore?: number;
  reseedCostUsd?: number;
}

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

export function scoreActivity(daysAgo: number | undefined): number {
  if (daysAgo === undefined) return 0;
  return Math.max(0, Math.pow(0.5, daysAgo / ACTIVITY_HALF_LIFE_DAYS));
}

export function scoreCommunity(retention: number | undefined): number {
  return clamp01(retention ?? 0);
}

export function scoreGovernance(raw: number | undefined): number {
  return clamp01(raw ?? 0);
}

export function scoreCost(reseedUsd: number | undefined): number {
  if (reseedUsd === undefined || reseedUsd <= 0) return 1;
  return Math.max(0, 1 - Math.log10(reseedUsd) / 6);
}

export function computeAxes(input: AxesInput): AxisScores {
  return {
    holders: scoreHolders(input.holders),
    lp: scoreLp(input.pairs),
    activity: scoreActivity(input.lastActivityDaysAgo),
    community: scoreCommunity(input.communityRetention),
    governance: scoreGovernance(input.governanceScore),
    cost: scoreCost(input.reseedCostUsd),
  };
}

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}
