export function gini(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((s, v) => s + v, 0);
  if (sum === 0) return 0;
  let num = 0;
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length; j++) {
      num += Math.abs((values[i] ?? 0) - (values[j] ?? 0));
    }
  }
  return num / (2 * values.length * sum);
}
