export const COUNT_BY_VALUES = [1, 3, 5] as const;

export type CountBy = (typeof COUNT_BY_VALUES)[number];
