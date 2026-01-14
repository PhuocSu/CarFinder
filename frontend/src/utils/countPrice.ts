export const calculateFinalPrice = (
  basePrice: number,
  discountPercent: number
): number => {
  if (discountPercent <= 0) {
    return basePrice;
  }
  return basePrice - basePrice * (discountPercent / 100);
};
