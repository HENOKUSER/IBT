
# day five exercises question 
class Vehicle:
    def __init__(self,make ,model):
        self.make=make
        self.model=model
    def description(self):
        return f"this vehicle is made in {self.make} and it is {self.model}  model"

class Car(Vehicle):   
    def __init__(self,make,model,capacity):
        super().__init__(make,model)
        self.capacity=capacity
    def description(self):
        return f"this car is made in {self.make} and it is {self.model}  model it\'s capacity is {self.capacity}"    
class Truck(Vehicle):  
    def __init__(self,make,model,capacity):
        super().__init__(make,model)
        self.capacity=capacity
    def description(self):
        return f"this truck is made in {self.make} and it is {self.model} model it\'s capacity is {self.capacity}"  
print("--------------------------------------")
# question #1
vehicle=Vehicle("ethiopia" ,"iv4")
print(vehicle.description())

# question #2  
# remove capacity from description method to get correct output
# car=Car("japan","sonata")
# truck=Truck("rusia","D4D")
# print(car.description())
# print(truck.description())

print("--------------------------------------")
# question 3 
car1=Car("japan","sonata","40 ton")
truck1=Truck("rusia","D4D","125 ton")
print(car1.description())
print(truck1.description())

# question 4
Vehiclelist =[Car("china","BYD","25 ton"),Car("china","NETA","45 ton"),Truck("japan","BZ4A","90 ton"),Truck("usa","ID6","100 ton")]
print("--------------------------------------")
for i in Vehiclelist:
    print(i.description())

from abc import ABC,abstractmethod
class Vehicle(ABC):
    def __init__(self,make ,model):
        self.make=make
        self.model=model
    @abstractmethod
    def wheels():
        pass
    def description(self):
        return f"this vehicle is made in {self.make} and it is {self.model}  model"

class Car(Vehicle):   
    def __init__(self,make,model,capacity):
        super().__init__(make,model)
        self.capacity=capacity
    def wheels(self,wheel):
        self.wheel=wheel
        return f"car has {self.wheel}" 
    def description(self):
        return f"this car is made in {self.make} and it is {self.model}  model it\'s capacity is {self.capacity}"    
    
class Truck(Vehicle):  
    def __init__(self,make,model,capacity):
        super().__init__(make,model)
        self.capacity=capacity
    def wheels(self,wheel):
        self.wheel=wheel
        return f"Truck has {self.wheel}"     
    def description(self):
        return f"this truck is made in {self.make} and it is {self.model} model it\'s capacity is {self.capacity}" 
    

print("--------------------------------------")
carabc =Car("china","BYD","25 ton")    
print(carabc.description())
print(carabc.wheels(4))
truckabc =Truck("japan","BZ4A","90 ton")
print (truckabc.description())
print(truckabc.wheels(5))

