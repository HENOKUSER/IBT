# first trial  see how to get out put 
print(1+3)              #  out put is 4
print("hello world")    #  out put is hello

#  built in function 
# 1. print()
print ("print is used Prints text or variables to the console.")
# . input()
inputExample = input("Enter your name: ")
print(f"Hello, {inputExample}! see input let user input data")  # try hat input does.

# 3. abs(x)
print(f"abs() is used to return the absolute value of a number: {abs(-10)}")


# 4. type()
print(f"type() is used to return the type of an object: {type(10)}")

# 5. len()
print(f"len() is used to return the length of an object: {len('hello world')}")

# 6. str()
print(f"str() is used to convert an object to a string: {str(10)}")

# their are also list of built in function which we will see in their respective topic.


# data types
# 1. number   int, float, complex ,list, tuple, set, dict, bool, str        

print("data types are used to define the type of data we are working with in python. ")

# 1. int
print(f"1. type(10): {type(10)}")  # int is used to represent whole numbers

# 2. float
print(f"2. type(10.5): {type(10.5)}")  # float is used to represent decimal numbers

# 3. complex
print(f"3. type(1 + 2j): {type(1 + 2j)}")  # complex is used to represent complex numbers     

# 4 string
print(f"4. type('hello world'): {type('hello world')}")  # string is used to represent text data 

# string concatenation
first_name = "sami" 
last_name = "ali"
full_name = first_name + " " + last_name    
print(f"full_name = {full_name}")  # sami ali   

print(f"full_name = {first_name} +5")  # sami5


# 5. list
print(f"5. type([1, 2, 3]): {type([1, 2, 3])}")  # list is used to represent a collection of items    
print(f"6. type(['sami', 'ali', 'ahmed']): {type(['sami', 'ali', 'ahmed'])}")  # list is used to represent a collection of items   

# 6. tuple
print(f"7. type((1, 2, 3)): {type((1, 2, 3))}")  # tuple is used to represent a collection of items that cannot be changed   

# 7 set
print(f"8. type({1, 2, 3}): {type({1, 2, 3})}")  # set is used to represent a collection of unique items     

# 8 dictionary          
print(f"9. type({{'name': 'sami', 'age': 23}}): {type({'name': 'sami', 'age': 23})}")  # dict is used to represent a collection of key-value pairs   


#  variables
# 1. variable is a name that holds a value

a=10
print(f"a = {a}")  # 10

first_name = "sami"
print(f"first_name = {first_name}")  # sami


# 2. variable name can be any valid identifier

variable_name = "example"
print(f"variable_name = {variable_name}")  # example                


# Operators 
# 1. assignment operators 
# =
name = "henok"
age = 25
print(f"name = {name}")  # henok
print(f"age = {age}")  # 25

# 2. artimetics operators 
# +, -, *, /, %, **, //, +=, -=, *=, /=, %=, **=, //=
number1=30
number2=10  
print(f"sum = {number1 + number2}")  # 40
print(f"diff = {number1 - number2}")  # 20
print(f"multi = {number1 * number2}")  # 300       
print(f"div = {number1 / number2}")  # 3.0  
print(f"modules ={number1%number2}")   # 0
print(f"exponent = {number1 ** number2}")  # 10000000000

print(f"floor division = {number1 // number2}")  # 3
increment=number1
increment += 5
print(f"increment = {increment}")  # 35

decrement=number1
decrement -= 5
print(f"decrement = {decrement}")  # 25      

multiply=number1
multiply *= 5
print(f"multiply = {multiply}")  # 150  

divide=number1
divide /= 5
print(f"divide = {divide}")  # 6.0        

modules=number1
modules %= 5
print(f"modules = {modules}")  # 0 

# 3. comparision operators 
# > , <  , >=  ,  <=  ,  ==  , !=  

print(f"greater than = {number1 > number2}")  # True
print(f"less than = {number1 < number2}")  # False      

print(f"greater than or equal to = {number1 >= number2}")  # True
print(f"less than or equal to = {number1 <= number2}")  # False 
print(f"equal to = {number1 == number2}")  # False
print(f"not equal to = {number1 != number2}")  # True           

# 4. logical operators
# logical operators are used to combine conditional statements
# and, or, not  

print(f"and = {number1 > 20 and number2 < 20}")  # True
# false and true = false
print(f"and = {number1 > 20 and number2 > 20}")  # False
print(f"or = {number1 > 20 or number2 < 20}")  # True
# false or true = true
print(f"or = {number1 > 20 or number2 > 20}")
print(f"not = {not(number1 > 20)}")  # False        

