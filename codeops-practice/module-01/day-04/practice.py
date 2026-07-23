
# day 4 excercises 
# question 1 
class Book :
    def __init__(self,title,author,pages):
        self.title=title 
        self.author=author 
        self.pages=pages
    def describe(self):
        return f"a book tittle {self.title} is written by {self.author}  it has {self.pages} page" 

book1=Book("book1","book1author",488)            
print(book1.describe())
book2=Book("book2","book2author",408)            
print(book2.describe())


# question 2 
class product :
    def __init__(self, name,price,quantity):
        self.name=name
        self.price=price
        self.quantity=quantity
    def restock(self,newInventory):
        if newInventory<=0:
            return f"{newInventory} amount is not allowed to try again using more stock number"
        self.quantity += newInventory
        return self.quantity 
    def sell(self,soldgood): 
        if soldgood<=0:
            return f"{soldgood} amount is not allowed to try again using more stock number"
        self.quantity -= soldgood
        return self.quantity

newproduct =product("break pad",5500,30)
print(newproduct.restock(25))
print(newproduct.sell(50))

# question 3,4,5

class product :
    def __init__(self, name,price,quantity):
        self.name=name
        self.price=price
        self.__quantity=quantity
    @property
    def getter(self):
        return self.__quantity
    def restock(self,newInventory):
        if newInventory<=0:
            return f"{newInventory} amount is not allowed to try again using more stock number"
        self.__quantity += newInventory
        return self.__quantity 
    def sell(self,soldgood): 
        if soldgood<=0:
            return f"perchase completed"
        self.__quantity -= soldgood
        return self.__quantity

newproduct =product("break pad",5500,30)
print(newproduct.restock(25))
print(newproduct.sell(50))

print(newproduct.getter)



newproduct =product("oil filter",2000,40)
print(newproduct.restock(25))

newproduct2 =product("break pad",5500,0)
print(newproduct2.restock(25))