export const getTotalPrice = (unitPrice: number, amount: number): number =>
  amount <= 10
    ? unitPrice * amount
    : Math.ceil(unitPrice * amount * (1 - Math.min(amount * 0.01, 0.5)))
