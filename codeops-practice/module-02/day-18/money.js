export const VAT = 0.15; // 15% VAT

export function addVat(amount) {
  return amount * (1 + VAT);
}
