/**
 * Gini coefficient over a list of non-negative weights.
 * Uses a sorted reduction so runtime is O(n log n) instead of O(n^2).
 * Returns 0 for empty input or zero sum (avoids NaN).
 */
export function gini(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = values
    .filter((v) => v >= 0)
    .slice()
    .sort((a, b) => a - b);
  const n = sorted.length;
  if (n === 0) return 0;
  let cum = 0;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const v = sorted[i] ?? 0;
    cum += (i + 1) * v;
    sum += v;
  }
  if (sum === 0) return 0;
  return (2 * cum) / (n * sum) - (n + 1) / n;
}
