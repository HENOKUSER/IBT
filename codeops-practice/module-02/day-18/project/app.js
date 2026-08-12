import { transactions } from "./transactions.js";
import {
  calculateTotals,
  generateReceipts,
  updateTransactionAmount,
} from "./report.js";

const correctedTransactions = updateTransactionAmount(
  transactions,
  "TXN-002",
  500,
);

const receipts = generateReceipts(correctedTransactions);
receipts.forEach((receipt) => console.log(receipt));

const { totalCredit, totalDebit, netBalance } = calculateTotals(
  correctedTransactions,
);

console.log(`Total Credit : ${totalCredit.toFixed(2)} ETB`);
console.log(`Total Debit  : ${totalDebit.toFixed(2)} ETB`);
console.log(`Net Balance  : ${netBalance.toFixed(2)} ETB`);
