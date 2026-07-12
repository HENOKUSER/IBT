print("hello world ");
#here is to add two number 
print(10+10)
# variables  name hold a value 
sami_Age= 23
print(sami_Age)
student_name= "sami"
print(student_name) 
print(f"sami is {sami_Age} years old")
#accept input from user 
salary= input("enter your salary")
#type casting 
#error type mismatch 
num1= 2500
strtonum="25"
# total_salary=salary+num1
# print (f"total salary is {total_salary} ") 

total_salary=int(strtonum)+num1
print (total_salary)
total_salary=int(salary)+num1
print (f"total salary is {total_salary} ")

#artimethic operator 
#  +,-,*,/,**,%,+=,-,
artinum1 =10 
artinum2 =5
sum =artinum1+artinum2
diff= artinum1-artinum2
multi =artinum1*artinum2
div=artinum1/artinum2
modu =artinum1%artinum2
artinum1+5

print  (sum,diff,multi,div,modu)

# comparision operator 
conditon1 =True
condition2 =False
condition3=True
andcondition =conditon1 & condition3
print(andcondition)
orcondition =conditon1 & condition2
print(orcondition)
#control flow 
#if 
print(conditon1)
{
    print ("condition1 is true")
}

if condition3:
    print("statement1")
    print("statement2")
    print("statement3")

#if else
if condition2:

    print ("condition is true")

else:

    print ("condition2 is false")


#elseif
condition4 =False 
if condition2:

    print ("first condition is true")

elif condition4:

    print ("second condition is true")

else:

    print ("last condition is true")

# loop 
#while loop
balanace =10
while balanace > 0:
  balanace=balanace-1  
  print (f"i have {balanace} remainig")
#for loop
for i in range(1,4):
    print(f"you are in {i} range")

#printing 1-5 and exit the loop 

for i in range (1,10):
    if i>5:
        break        
    print (f"I is{i}")


for j in range(1,10):
        if j==5:
             continue
        print (f"J is{j}")

# function 

# no argument 
def welcome():
    print("hi wellcome")

welcome()    
#  with argument 
def add(num1,num2):
    return num1+num2


print (add(10,25))

    # class room work

payment =1000
tip= 20
def dividBill(payment):
    toatlpayment=payment+tip
    return toatlpayment/5

for i in range (1,6):
    print(f"person{i} will pay {dividBill(payment)}")

