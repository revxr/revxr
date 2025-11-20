# scoring

Six axes, each normalised to [0, 1]:

| axis        | weight | intuition                                   |
|-------------|--------|---------------------------------------------|
| holders     | 0.25   | Higher is better. Penalises top1 dominance. |
| lp          | 0.20   | Higher is better. Log-scaled in USD.        |
| activity    | 0.15   | Recency of on-chain activity. Half-life 14d.|
| community   | 0.15   | Retention rate of non-whale holders.        |
| governance  | 0.15   | Vote/proposal activity if applicable.       |
| cost        | 0.10   | Estimated cost to re-seed liquidity.        |

## Why these weights?

The short answer: we want the score to punish concentrated ownership hardest,
because concentrated ownership is the single most common reason a revival
fails out. LP is second because without liquidity a revival cannot even
begin. Activity is third because a stale chain is still salvageable if
everything else lines up.

These weights are deliberately boring. Tune them in `src/scanner/axes.ts` if
your use-case differs.

## Thresholds

There are no hard thresholds baked in. A score of 0.5 does not mean "revive";
it means "the six axes average out to 0.5". Combine with your own judgement.
