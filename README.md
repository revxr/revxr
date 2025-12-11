# revxr

> We fix the dead.

Reference tooling for looking at dormant Solana tokens and protocols and
deciding whether there is anything worth reviving. The scanner produces a
Revival Report; the builder assembles (unsigned) migration and treasury
transactions for a human to sign.

## Install

```
git clone https://github.com/revxr/revxr.git
cd revxr
npm install
```

## Usage

```ts
import { analyzeToken } from "revxr";

const report = await analyzeToken({
  mint: "So11111111111111111111111111111111111111112",
  holders: holdersFixture,
  pairs: pairsFixture,
});
console.log(report.score);
```

## Axes

The Revival Score is a weighted blend of six axes:

| axis        | weight | what it captures                           |
|-------------|--------|--------------------------------------------|
| holders     | 0.25   | distribution of ownership (gini + top1)    |
| lp          | 0.20   | liquidity depth and pair health            |
| activity    | 0.15   | recent on-chain movement                   |
| community   | 0.15   | retention of non-whale holders             |
| governance  | 0.15   | vote/proposal activity if applicable       |
| cost        | 0.10   | estimated cost to re-seed liquidity        |

## License

MIT
