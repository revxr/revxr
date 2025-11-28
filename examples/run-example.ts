import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeToken } from "../src/index.js";

const here = dirname(fileURLToPath(import.meta.url));

function load<T>(name: string): T {
  return JSON.parse(readFileSync(join(here, name), "utf-8")) as T;
}

interface Activity {
  lastActivityDaysAgo: number;
  communityRetention: number;
  governanceScore: number;
  reseedCostUsd: number;
}

async function main(): Promise<void> {
  const holders = load<{ amount: number }[]>("mock-holders.json");
  const pairs = load<{ liquidityUsd: number }[]>("mock-pairs.json");
  const activity = load<Activity>("mock-activity.json");
  const report = await analyzeToken({
    mint: "So11111111111111111111111111111111111111112",
    holders,
    pairs,
    lastActivityDaysAgo: activity.lastActivityDaysAgo,
    communityRetention: activity.communityRetention,
    governanceScore: activity.governanceScore,
    reseedCostUsd: activity.reseedCostUsd,
  });
  console.log(JSON.stringify(report, null, 2));
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
