export function calculateTotals(txns) {
  const credits = txns.filter((t) => t.type === "credit");
  const debits = txns.filter((t) => t.type === "debit");

  const totalCredit = credits.reduce((sum, t) => sum + t.amount, 0);
  const totalDebit = debits.reduce((sum, t) => sum + t.amount, 0);

  return { totalCredit, totalDebit, netBalance: totalCredit - totalDebit };
}

export function generateReceipts(transactions) {
  return transactions.map(
    ({ customer, amount, type }) =>
      `[Receipt] Customer: ${customer} | Amount: ${amount.toFixed(2)} ETB (${type.toUpperCase()})`,
  );
}

export function updateTransactionAmount(txns, targetId, newAmount) {
  return txns.map((txn) => {
    if (txn.id === targetId) {
      return { ...txn, amount: newAmount };
    }
    return txn;
  });
}
