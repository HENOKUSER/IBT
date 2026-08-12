import { totalPayment } from "./app.js";

// 1.
const etbPrices = [2500, 5250, 780, 4500, 900];

const vatAdded = etbPrices.map((price) =>
  Number((price + 0.15 * price).toFixed(2)),
);
console.log(vatAdded);

const filtered = vatAdded.filter(
  (vatIncludedPrice) => vatIncludedPrice >= 1000,
);
console.log(filtered);

const grandTotal = filtered.reduce(
  (totalPrice, currentPrice) => totalPrice + currentPrice,
  0,
);
console.log(grandTotal);

// 2.

const customer = {
  name: "henok",
  city: "addis abeba",
  balance: 1500,
};

for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}

// 3
const { name, city } = customer;

function greet({ name }) {
  return `Hello, ${name}!`;
}
const geertCustomer = greet(customer);
console.log(geertCustomer);

// 4
const updatedCustomer = {
  ...customer,
  city: "sendafa",
  phone: "0911121314",
};

console.log("Original:", customer);
console.log("Updated:", updatedCustomer);

// 5

console.log(totalPayment);
