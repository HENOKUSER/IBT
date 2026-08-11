const vatcalculate = function vat(amount, rate = 0.15) {
  return amount * rate;
};
console.log(vatcalculate(1200));

const vatcalc = (amt, vatrate) => amt * vatrate;
console.log(vatcalc(20000, 0.15));

function makeCounter() {
  let count = 0;
  return function incrementingCount() {
    count++;
    return count;
  };
}
const counting = makeCounter();
counting();
counting();
counting();
counting();
console.log(counting());

/*
WHY 'count' STAYS PRIVATE:
The 'count' variable is declared inside 'makeCounter'. In JavaScript,
   variables declared with 'let' or 'const' are accessible only within their block/function scope.
   Outside code cannot directly access or mutate 'count' (e.g., 'counterA.count' is undefined).
*/

function discountBy(rate) {
  return function calculateDiscountedPrice(price) {
    return price * (1 - rate);
  };
}

const memberPrice = discountBy(0.1);
const salePrice = discountBy(0.3);

const price = 1000;

console.log(memberPrice(price));
console.log(salePrice(price));

// Higher-order function that transforms each item in a list using a callback function
function applyToAll(list, fn) {
  const result = [];
  for (let i = 0; i < list.length; i++) {
    result.push(fn(list[i]));
  }
  return result;
}

// Function to add 15% VAT to a single price
const addVAT = (price) => Number((price * 1.15).toFixed(2));

// Sample price list (in ETB)
const prices = [100, 250, 500, 1200];

// Apply VAT to all prices using applyToAll
const pricesWithVAT = applyToAll(prices, addVAT);

console.log("Original Prices:", prices);
console.log("Prices with VAT:", pricesWithVAT);

const city = ["addis abeba", "jimma", "agaro", "shewarobit"];

city.forEach((element, index) => {
  console.log(`${index + 1} . ${element}`);
});
