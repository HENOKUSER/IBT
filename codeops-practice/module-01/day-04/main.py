# day 4 class work 
# question 1
class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance  # private 
#    question 2 
    @property
    def readbalance(self):
        return self.__balance
# question 3 
    def deposit(self, amount):
        if amount <= 0:
            print(f"amount must be positive (got {amount} ETB).") # question 4 
        self.__balance += amount
        print(f"Deposited {amount} ETB. New balance: {self.__balance} ETB.")    

    def withdraw(self, amount):
        if amount <= 0:
            print(f"Withdrawal rejected: amount must be positive (got {amount} ETB).") # question 4
            return
        if amount > self.__balance:
            print(f"insufficient funds "
                  f"(balance is {self.__balance} ETB, tried to withdraw {amount} ETB).")
            return
        self.__balance -= amount
        print(f"Withdrew {amount} ETB. New balance: {self.__balance} ETB.")

    # def __str__(self):
    #     return f"Account[{self.account_number}] owner={self.owner}, balance={self.__balance} ETB"


# question 5
acc1 = Account("Abebe ", "ACC-001", 1000)
acc2 = Account("henok ", "ACC-002", 500)

print(acc1)
print(acc2)

print(acc1.deposit(2000) )     # valid
acc1.withdraw(150)     # valid
acc1.withdraw(5000)    # invalid: overdraft
acc1.deposit(-50)      # invalid: 

acc2.deposit(300)      # valid
acc2.withdraw(1000)    # invalid: 
