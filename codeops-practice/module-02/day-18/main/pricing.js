"use strict";

const subTotal = (...prices) => {
  const total = prices.reduce((Acc, cur) => {
    return Acc + cur;
  }, 0);
  return total;
};

console.log(subTotal(25, 35, 89, 78, 1));
console.log(subTotal(10, 24, 15, 26, 80));

const discountBy = (rate) => {
  const sellrate = rate;
  return function sell(price) {
    return (price -= price * sellrate);
  };
};

const tenPercentdiscount = discountBy(0.1);
const halfdiscount = discountBy(0.5);

const addvat = halfdiscount(5000);

console.log(tenPercentdiscount(2555));
console.log(halfdiscount(5000));

export const withVat = (n) => {
  return (n += 0.15 * n);
};

console.log(withVat(addvat));

const reciept = withVat(addvat);

const toETB = (totalPrice) => {
  return `${totalPrice.toFixed(2)} ETB`;
};

console.log(toETB(reciept));

export const receiptmaker = (disCountRate) => {
  let orderNo = 0;
  const applyDiscount = discountBy(disCountRate); // Remembered rate

  return function (...items) {
    orderNo++;
    const total = subTotal(...items); // Spread items array into subTotal
    const discountedPrice = applyDiscount(total); // Apply discount
    const finalPrice = withVat(discountedPrice); // Add VAT

    return `${orderNo} : ${finalPrice.toFixed(2)} ETB`; // Return string directly
  };
};

// --- Execution ---
const disCountRate = 0.15; // 15% discount
const generateReceipt = receiptmaker(disCountRate);

// Pass item prices directly to the inner function:
console.log(generateReceipt(250, 1505, 975, 105, 2045)); // Outputs: "1 : 4770.20 ETB"
console.log(generateReceipt(100, 200));
