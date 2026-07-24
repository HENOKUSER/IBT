from abc import ABC, abstractmethod
from typing import Dict, List, Optional

class Observer(ABC):
    @abstractmethod
    def update(self, message: str) -> None:
        pass


class SMSAlert(Observer):
    def __init__(self, phone_number: str):
        self.phone_number = phone_number

    def update(self, message: str) -> None:
        print(f"[SMS to {self.phone_number}]: {message}")

class Account:
    def __init__(self, owner: str, account_number: str, balance: float = 0):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance
        self._subscribers: List[Observer] = []
        self._history_stack: List[dict] = []  

    def subscribe(self, observer: Observer):
        if observer not in self._subscribers:
            self._subscribers.append(observer)

    def unsubscribe(self, observer: Observer):
        if observer in self._subscribers:
            self._subscribers.remove(observer)

    def _notify(self, message: str) :
        for observer in self._subscribers:
            observer.update(message)

    @property
    def readbalance(self) -> float:
        return self._balance

    def deposit(self, amount: float):
        if amount <= 0:
            msg = f"Amount must be positive (got {amount} ETB)."
            print(msg)
            self._notify(msg)
            return self._balance

        self._balance += amount
        self._history_stack.append({"type": "deposit", "amount": amount})

        msg = f"Deposited {amount} ETB. New balance: {self._balance} ETB."
        print(msg)
        self._notify(msg)
        return self._balance

    def withdraw(self, amount: float):
        if amount <= 0:
            msg = f"Amount must be positive (got {amount} ETB)."
            print(msg)
            self._notify(msg)
            return

        if amount > self._balance:
            msg = (f"Insufficient funds (balance is {self._balance} ETB, "
                   f"tried to withdraw {amount} ETB).")
            print(msg)
            self._notify(msg)
            return

        self._balance -= amount
        self._history_stack.append({"type": "withdraw", "amount": amount})

        msg = f"Withdrew {amount} ETB. New balance: {self._balance} ETB."
        print(msg)
        self._notify(msg)

    def undo_last(self) -> None:
        if not self._history_stack:
            msg = "Undo failed: No transaction history available."
            print(msg)
            self._notify(msg)
            return

        last_txn = self._history_stack.pop()
        txn_type = last_txn["type"]
        amount = last_txn["amount"]

        if txn_type == "deposit":
            self._balance -= amount
            msg = f"Undid Deposit of {amount} ETB. Reverted balance: {self._balance} ETB."
        elif txn_type == "withdraw":
            self._balance += amount
            msg = f"Undid Withdrawal of {amount} ETB. Reverted balance: {self._balance} ETB."

        print(msg)
        self._notify(msg)

    def count_transactions_recursive(self, index: int = 0) -> int:
        if index >= len(self._history_stack):
            return 0
        return 1 + self.count_transactions_recursive(index + 1)

    def statement(self) -> str:
        return f"Account[{self.account_number}] owner={self.owner}, balance={self._balance} ETB"

    def __str__(self) -> str:
        return self.statement()


class SavingsAccount(Account):
    def __init__(self, owner: str, account_number: str, balance: float = 0, rate: float = 0.0):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self) -> float:
        interest = self._balance * self.rate
        self._balance += interest
        self._history_stack.append({"type": "deposit", "amount": interest})

        msg = f"Interest added: {interest} ETB. New balance: {self._balance} ETB."
        print(msg)
        self._notify(msg)
        return self._balance

    def statement(self) -> str:
        return (f"[Savings] Account[{self.account_number}] owner={self.owner}, "
                f"balance={self._balance} ETB, rate={self.rate * 100}%")


class CurrentAccount(Account):
    def __init__(self, owner: str, account_number: str, balance: float = 0, overdraft_limit: float = 0):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount: float):
        if amount <= 0:
            msg = f"Amount must be positive (got {amount} ETB)."
            print(msg)
            self._notify(msg)
            return

        if amount > self._balance + self.overdraft_limit:
            msg = (f"Exceeds overdraft limit (balance {self._balance} ETB + "
                   f"overdraft {self.overdraft_limit} ETB, tried to withdraw {amount} ETB).")
            print(msg)
            self._notify(msg)
            return

        self._balance -= amount
        self._history_stack.append({"type": "withdraw", "amount": amount})

        msg = f"Withdrew {amount} ETB. New balance: {self._balance} ETB."
        print(msg)
        self._notify(msg)

    def statement(self) -> str:
        return (f"[Current] Account[{self.account_number}] owner={self.owner}, "
                f"balance={self._balance} ETB, overdraft_limit={self.overdraft_limit} ETB")

class AccountFactory:
    @staticmethod
    def create(kind: str, owner: str, account_number: str, balance: float = 0, **kwargs) -> Account:
        kind_clean = kind.strip().lower()
        if kind_clean in ["savings", "saving"]:
            return SavingsAccount(owner, account_number, balance, rate=kwargs.get("rate", 0.0))
        elif kind_clean in ["current", "checking"]:
            return CurrentAccount(owner, account_number, balance, overdraft_limit=kwargs.get("overdraft_limit", 0))
        elif kind_clean == "base":
            return Account(owner, account_number, balance)
        else:
            raise ValueError(f"Unknown account kind: '{kind}'")

class AccountRegistry:
    def __init__(self):
        self._accounts: Dict[str, Account] = {}

    def add(self, account: Account) -> None:
        self._accounts[account.account_number] = account

    def find(self, account_number: str) -> Optional[Account]:
        return self._accounts.get(account_number)

    def list_all(self) -> List[Account]:
        return sorted(self._accounts.values(), key=lambda acc: acc.account_number)

    # Step 2: Top N Accounts Leaderboard
    def top_by_balance(self, n: int) -> List[Account]:
        """Returns the top N accounts with the highest balance."""
        sorted_accounts = sorted(self._accounts.values(), key=lambda acc: acc.readbalance, reverse=True)
        return sorted_accounts[:n]

    # Step 3: Custom Binary Search Implementation
    def binary_search(self, sorted_list: List[Account], target_number: str) -> Optional[Account]:
        """Performs binary search on a list of accounts sorted by account_number."""
        low = 0
        high = len(sorted_list) - 1

        while low <= high:
            mid = (low + high) // 2
            mid_acc = sorted_list[mid]

            if mid_acc.account_number == target_number:
                return mid_acc
            elif mid_acc.account_number < target_number:
                low = mid + 1
            else:
                high = mid - 1

        return None

    def find_by_number(self, account_number: str) -> Optional[Account]:
        """Finds an account using binary search on a sorted list of accounts."""
        sorted_accs = self.list_all()  # Guarantees sorted order by account_number
        return self.binary_search(sorted_accs, account_number)

    # Step 4: Recursive Total Transactions Wrapper
    def total_transactions(self, account_number: str) -> int:
        """Looks up an account and calculates its transaction total recursively."""
        acc = self.find(account_number)
        if acc:
            return acc.count_transactions_recursive()
        print(f"Account {account_number} not found.")
        return 0

if __name__ == "__main__":
    registry = AccountRegistry()

    # Populate sample data
    acc1 = AccountFactory.create("base", "Abebe", "ACC-001", balance=1000)
    acc2 = AccountFactory.create("savings", "Marta", "CBE-001", balance=5000, rate=0.05)
    acc3 = AccountFactory.create("current", "Henok", "CBE-002", balance=2500, overdraft_limit=1000)
    acc4 = AccountFactory.create("base", "Kebede", "ACC-002", balance=8000)

    for acc in [acc1, acc2, acc3, acc4]:
        registry.add(acc)

    print("=== Step 2: Leaderboard (Top 2 by Balance) ===")
    for acc in registry.top_by_balance(2):
        print(f"{acc.owner} - Balance: {acc.readbalance} ETB")

    print("\n=== Step 3: Binary Search Test ===")
    search_target = "CBE-002"
    result = registry.find_by_number(search_target)
    if result:
        print(f"Binary Search Found: {result}")
    else:
        print(f"Account {search_target} not found.")

    print("\n=== Step 4: Recursive Transaction Count Test ===")
    # Perform transactions on Marta's account (acc2: CBE-001)
    acc2.deposit(1000)
    acc2.withdraw(500)
    acc2.add_interest()

    total_txns = registry.total_transactions("CBE-001")
    print(f"\nTotal transactions for CBE-001 (counted recursively): {total_txns}")