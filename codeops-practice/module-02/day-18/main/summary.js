import { receiptmaker as format, withVat } from "/price.js";
// Sample orders data
const orders = [
  {
    id: "ORD-101",
    items: [
      { price: 150, qty: 2 },
      { price: 100, qty: 1 },
    ], // 400 ETB
  },
  {
    id: "ORD-102",
    items: [
      { price: 250, qty: 2 },
      { price: 200, qty: 1 },
    ], // 700 ETB
  },
  {
    id: "ORD-103",
    items: [{ price: 300, qty: 3 }], // 900 ETB
  },
  {
    id: "ORD-104",
    items: [{ price: 50, qty: 2 }], // 100 ETB
  },
];

// 2 & 3. Calculate item totals with reduce (destructuring) and attach total via map + spread
const ordersWithTotals = orders.map((order) => {
  const total = order.items.reduce(
    (sum, { price, qty }) => sum + price * qty,
    0,
  );
  return { ...order, total };
});

// 4. Filter orders over 500 ETB
const highValueOrders = ordersWithTotals.filter((order) => order.total > 500);

// 5. Calculate grand total and print summary
const grandTotal = highValueOrders.reduce((sum, order) => sum + order.total, 0);

highValueOrders.forEach((order) => {
  console.log(`Order ${order.id}: ${order.total.toFixed(2)} ETB`);
});
console.log(`Grand Total: ${grandTotal.toFixed(2)} ETB`);
