import { MEMO_TAG } from "./memo.js";

export interface BuildInput {
  payer: string;
  recipient: string;
  lamports: number;
  memo?: string;
}

export interface BuildOutput {
  kind: "unsigned";
  payer: string;
  recipient: string;
  lamports: number;
  memo: string;
}

/**
 * Build an unsigned revival payload. The caller is responsible for signing
 * with their wallet; this module never touches a private key.
 */
export function buildRevivalTx(input: BuildInput): BuildOutput {
  if (!input.payer) throw new Error("payer is required");
  if (!input.recipient) throw new Error("recipient is required");
  if (!Number.isFinite(input.lamports) || input.lamports <= 0) {
    throw new Error("lamports must be a positive finite number");
  }
  return {
    kind: "unsigned",
    payer: input.payer,
    recipient: input.recipient,
    lamports: Math.floor(input.lamports),
    memo: input.memo ?? MEMO_TAG,
  };
}
