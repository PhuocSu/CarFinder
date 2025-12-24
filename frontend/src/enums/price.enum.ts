export const PRICE_STEPS = [
    // 100 → 2000 (step 100)
    ...Array.from({ length: 20 }, (_, i) => (i + 1) * 100),
  
    // 2500 → 4000 (step 500)
    2500, 3000, 3500, 4000,
  
    // 5000 → 10000 (step 1000)
    ...Array.from({ length: 6 }, (_, i) => (i + 5) * 1000),
  ].map((value) => ({
    value,
    label: `${value.toLocaleString()} 만원`,
  }));
  