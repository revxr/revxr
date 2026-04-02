export type AxisName =
  | "holders"
  | "lp"
  | "activity"
  | "community"
  | "governance"
  | "cost";

export type AxisScores = Record<AxisName, number>;

export interface RevivalReport {
  mint: string;
  score: number;
  axes: AxisScores;
}
