export const START_YEAR = 2000;

export const CURRENT_YEAR = new Date().getFullYear();

export const YEARS: readonly number[] = Array.from(
  { length: CURRENT_YEAR - START_YEAR + 1 },
  (_, index) => START_YEAR + index
);
