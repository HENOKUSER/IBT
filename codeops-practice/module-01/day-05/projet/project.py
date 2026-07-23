# day 5 exercise
# question copy day 4 class exercise file
class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance  # private -> protected so subclasses can reach it directly

    @property
    def readbalance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            print(f"amount must be positive (got {amount} ETB).")
            return self._balance
        self._balance += amount
        print(f"Deposited {amount} ETB. New balance: {self._balance} ETB.")
        return self._balance

    def withdraw(self, amount):
        if amount <= 0:
            print(f"amount must be positive (got {amount} ETB).")
            return
        if amount > self._balance:
            print(f"insufficient funds "
                  f"(balance is {self._balance} ETB, tried to withdraw {amount} ETB).")
            return
        self._balance -= amount
        print(f"Withdrew {amount} ETB. New balance: {self._balance} ETB.")

    def statement(self):
        return f"Account[{self.account_number}] owner={self.owner}, balance={self._balance} ETB"

    def __str__(self):
        return self.statement()

# question 2
class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0, rate=0.0):
        super().__init__(owner, account_number, balance)
        self.rate = rate  # e.g. 0.05 = 5%

    def add_interest(self):
        interest = self._balance * self.rate
        self._balance += interest
        print(f"Interest added: {interest} ETB. New balance: {self._balance} ETB.")
        return self._balance

    def statement(self):
        return (f"[Savings] Account[{self.account_number}] owner={self.owner}, "
                f"balance={self._balance} ETB, rate={self.rate * 100}%")

# question 3
class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0, overdraft_limit=0):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            print(f"amount must be positive (got {amount} ETB).")
            return
        if amount > self._balance + self.overdraft_limit:
            print(f"exceeds overdraft limit "
                  f"(balance {self._balance} ETB + overdraft {self.overdraft_limit} ETB, "
                  f"tried to withdraw {amount} ETB).")
            return
        self._balance -= amount
        print(f"Withdrew {amount} ETB. New balance: {self._balance} ETB.")

    def statement(self):
        return (f"[Current] Account[{self.account_number}] owner={self.owner}, "
                f"balance={self._balance} ETB, overdraft_limit={self.overdraft_limit} ETB")

# question 4
accounts = [
    Account("Abebe", "ACC-001", 1000),
    SavingsAccount("Marta", "CBE-001", 2000, rate=0.05),
    CurrentAccount("Henok", "CBE-002", 500, overdraft_limit=1000),
           ]
for acc in accounts:
    print(acc.statement())
