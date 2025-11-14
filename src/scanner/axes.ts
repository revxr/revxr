import { gini } from "../common/gini.js";

export function scoreHolders(holders: { amount: number }[]): number {
  if (holders.length === 0) return 0;
  const g = gini(holders.map((h) => h.amount));
  return Math.max(0, 1 - g);
}
