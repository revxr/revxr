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
  memo?: string;
}

export function buildRevivalTx(input: BuildInput): BuildOutput {
  if (input.lamports <= 0) throw new Error("lamports must be > 0");
  return {
    kind: "unsigned",
    payer: input.payer,
    recipient: input.recipient,
    lamports: input.lamports,
    memo: input.memo,
  };
}
