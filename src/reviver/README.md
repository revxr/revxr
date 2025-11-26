# reviver

Assembles unsigned revival payloads. The builder never signs; it hands a
plain object back to the caller for their wallet to sign.

A memo tag (`revxr:revival`) is attached to every payload so the
on-chain footprint is trivially auditable.
