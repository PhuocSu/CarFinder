export const MILEAGE_STEPS = Array.from(
  { length: 20 },
  (_, i) => (i + 1) * 10000
).map((value) => ({
  value,
  label: `${value.toLocaleString()} km`,
}));
