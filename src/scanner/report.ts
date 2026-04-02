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
  notes?: string[];
}

export const DEFAULT_REPORT: RevivalReport = {
  mint: "",
  score: 0,
  axes: {
    holders: 0,
    lp: 0,
    activity: 0,
    community: 0,
    governance: 0,
    cost: 0,
  },
};
