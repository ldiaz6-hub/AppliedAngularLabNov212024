export const WITHDRAWAL_AMOUNTS = [20, 50, 100] as const;

export type WithdrawAmount = (typeof WITHDRAWAL_AMOUNTS)[number];
