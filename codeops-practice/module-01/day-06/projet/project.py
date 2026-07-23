from abc import ABC, abstractmethod

class Observer(ABC):

    @abstractmethod
    def update(self, message: str) -> None:
        pass

class SMSAlert(Observer):

    def __init__(self, phone_number: str):
        self.phone_number = phone_number

    def update(self, message: str):
        print(f"[SMS to {self.phone_number}]: {message}")


class Account:
    def __init__(self, owner: str, account_number: str, balance: float = 0):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance
        self._subscribers: list[Observer] = []

    def subscribe(self, observer: Observer):
        if observer not in self._subscribers:
            self._subscribers.append(observer)

    def unsubscribe(self, observer: Observer):
        if observer in self._subscribers:
            self._subscribers.remove(observer)

    def _notify(self, message: str):
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
        msg = f"Withdrew {amount} ETB. New balance: {self._balance} ETB."
        print(msg)
        self._notify(msg)

    def statement(self) -> str:
        return f"Account[{self.account_number}] owner={self.owner}, balance={self._balance} ETB"

    def __str__(self) -> str:
        return self.statement()


class SavingsAccount(Account):
    def __init__(self, owner: str, account_number: str, balance: float = 0, rate: float = 0.0):
        super().__init__(owner, account_number, balance)
        self.rate = rate  # e.g., 0.05 = 5%

    def add_interest(self) -> float:
        interest = self._balance * self.rate
        self._balance += interest
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
        msg = f"Withdrew {amount} ETB. New balance: {self._balance} ETB."
        print(msg)
        self._notify(msg)

    def statement(self) -> str:
        return (f"[Current] Account[{self.account_number}] owner={self.owner}, "
                f"balance={self._balance} ETB, overdraft_limit={self.overdraft_limit} ETB")

class AccountFactory:
    """Factory to handle standard creation of account objects."""
    @staticmethod
    def create(kind: str, owner: str, account_number: str, balance: float = 0, **kwargs) -> Account:
        kind_clean = kind.strip().lower()
        if kind_clean in ["savings", "saving"]:
            rate = kwargs.get("rate", 0.0)
            return SavingsAccount(owner, account_number, balance, rate=rate)
        elif kind_clean in ["current", "checking"]:
            overdraft_limit = kwargs.get("overdraft_limit", 0)
            return CurrentAccount(owner, account_number, balance, overdraft_limit=overdraft_limit)
        elif kind_clean == "base":
            return Account(owner, account_number, balance)
        else:
            raise ValueError(f"Unknown account kind: '{kind}'")

if __name__ == "__main__":
    # Create accounts via the factory
    marta_acc = AccountFactory.create("savings", "Marta", "CBE-001", balance=2000, rate=0.05)
    henok_acc = AccountFactory.create("current", "Henok", "CBE-002", balance=500, overdraft_limit=1000)

    # Instantiate and attach an SMS alert observer to Marta's account
    marta_sms = SMSAlert("+251911000000")
    marta_acc.subscribe(marta_sms)

    print("--- Executing Operations on Marta's Savings Account ---")
    marta_acc.deposit(500)
    marta_acc.add_interest()

    print("\n--- Executing Operations on Henok's Current Account ---")
    henok_acc.withdraw(1200)  # Uses overdraft