# scanner

Takes snapshots (holders, pairs, activity) and returns a Revival Report.

This module is deliberately RPC-free. Adapters that fetch live data from
Helius, Jupiter or DexScreener are not included here; callers are expected
to fetch and normalise the data before calling `analyzeToken`.

See ../../docs/scoring.md for the weighting rationale.
