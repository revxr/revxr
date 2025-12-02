# safety

The builder in `src/reviver/builder.ts` never signs. It returns a payload
that contains a payer, a recipient, an amount and a memo. Signing is the
wallet's responsibility.

Every payload is tagged with a memo (`revxr:revival`) so that the
on-chain footprint of revival transactions is trivially searchable. This is
non-negotiable; a revival without a clear memo looks indistinguishable from
a rug and we would rather not contribute to that.

## What this package does not do

- It does not call RPCs.
- It does not hold keys.
- It does not emit advice. The score is a number, not a recommendation.
- It does not do governance takeovers on your behalf.

If you want any of those behaviours, build them on top. Do not ask this
library to do them.
