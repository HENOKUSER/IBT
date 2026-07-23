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
        self._history_stack: List[dict] = []  # Stack for LIFO transaction history

    def subscribe(self, observer: Observer) -> None:
        if observer not in self._subscribers:
            self._subscribers.append(observer)

    def unsubscribe(self, observer: Observer) -> None:
        if observer in self._subscribers:
            self._subscribers.remove(observer)

    def _notify(self, message: str) -> None:
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
        # Push transaction to history stack
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
        # Push transaction to history stack
        self._history_stack.append({"type": "withdraw", "amount": amount})

        msg = f"Withdrew {amount} ETB. New balance: {self._balance} ETB."
        print(msg)
        self._notify(msg)

    def undo_last(self) -> None:
        """Pops the most recent transaction from history and reverses its effect."""
        if not self._history_stack:
            msg = "Undo failed: No transaction history available."
            print(msg)
            self._notify(msg)
            return

        last_txn = self._history_stack.pop()  # LIFO Pop
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
    """Stores accounts in a dictionary for O(1) lookup."""
    def __init__(self):
        self._accounts: Dict[str, Account] = {}

    def add(self, account: Account) -> None:
        """Adds an account object to the registry."""
        self._accounts[account.account_number] = account

    def find(self, account_number: str) -> Optional[Account]:
        """O(1) dictionary lookup by account_number."""
        return self._accounts.get(account_number)

    def list_all(self) -> List[Account]:
        """Returns all accounts in order of account_number."""
        return sorted(self._accounts.values(), key=lambda acc: acc.account_number)

if __name__ == "__main__":
    registry = AccountRegistry()

    # Step 3: Add accounts via Factory into Registry
    acc1 = AccountFactory.create("savings", "Marta", "CBE-001", balance=2000, rate=0.05)
    acc2 = AccountFactory.create("current", "Henok", "CBE-002", balance=500, overdraft_limit=1000)
    acc3 = AccountFactory.create("base", "Abebe", "ACC-001", balance=1000)

    registry.add(acc1)
    registry.add(acc2)
    registry.add(acc3)

    print("--- O(1) Find Test ---")
    found_acc = registry.find("CBE-001")
    if found_acc:
        print(f"Found: {found_acc}")

    print("\n--- Ordered List All Accounts ---")
    for acc in registry.list_all():
        print(acc)

    print("\n--- Transaction Stack & Undo Test ---")
    acc1.deposit(500)    # Balance: 2500
    acc1.withdraw(200)   # Balance: 2300

    print("\nPerforming Undo:")
    acc1.undo_last()     # Undoes withdraw -> Balance: 2500
    acc1.undo_last()     # Undoes deposit  -> Balance: 2000
    acc1.undo_last()     # Stack empty message