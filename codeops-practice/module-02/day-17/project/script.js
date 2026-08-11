// --- Pure Earn Rules ---
// Base rule: 1 point per 10 ETB spent
const standardRule = (amountSpent) => Math.floor(amountSpent / 10);

// Higher-order rule generator: creates custom rules (e.g. double points for holidays)
const createMultiplierRule = (multiplier) => (amountSpent) =>
  Math.floor(amountSpent / 10) * multiplier;

const holidayRule = createMultiplierRule(2); // Double points rule

// --- TeleBirr Loyalty Points Module ---
function createLoyaltyAccount(initialBalance = 0) {
  // Private variable captured in closure - inaccessible from outside
  let balance = initialBalance;

  return {
    // Higher-order method: accepts a rule function to calculate points earned
    earn(amountSpent, earnRule = standardRule) {
      if (amountSpent <= 0) return balance;

      const earned = earnRule(amountSpent);
      balance += earned;
      return earned; // Returns newly earned points
    },

    // Refuses redemption if requested points exceed current balance or are invalid
    redeem(amount) {
      if (amount <= 0 || amount > balance) {
        return false; // Redemption refused
      }
      balance -= amount;
      return true; // Redemption successful
    },

    // Pure getter for current points balance
    balance() {
      return balance;
    },
  };
}

// --- Usage & Edge Console Outputs ---

const customerAccount = createLoyaltyAccount();

// 1. Earn points using standard rule (100 ETB -> 10 points)
const earned1 = customerAccount.earn(100, standardRule);
console.log(
  `Earned: ${earned1} pts | Current Balance: ${customerAccount.balance()} pts`,
);

// 2. Earn points using holiday rule (200 ETB -> 40 points)
const earned2 = customerAccount.earn(200, holidayRule);
console.log(
  `Holiday Earned: ${earned2} pts | Current Balance: ${customerAccount.balance()} pts`,
);

// 3. Successful redemption (30 points)
const redeemSuccess = customerAccount.redeem(30);
console.log(
  `Redemption (30 pts) Successful? ${redeemSuccess} | New Balance: ${customerAccount.balance()} pts`,
);

// 4. Failed redemption (attempt to redeem more points than available)
const redeemFailed = customerAccount.redeem(500);
console.log(
  `Redemption (500 pts) Successful? ${redeemFailed} | Balance unchanged: ${customerAccount.balance()} pts`,
);

// 5. Verification of privacy
console.log(`Direct balance access: ${customerAccount.balance}`); // undefined
