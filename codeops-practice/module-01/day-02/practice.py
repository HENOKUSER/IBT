# question 1
temp_input=float(input("enter temprature in degree celisues \n" ))

if temp_input<15:
    print("cold")
elif temp_input>=15 and temp_input<28:
    print("warm")
else:
    print("hot")

#question 2
for receipt in range (1,11):
    print(f"receipt: {receipt}")

#question 3
count=1
while count<=20:
    if count%2==0:
        print(f"even number b/n 1-20 --> {count}")
    count+=1

#question 4 
def apply_discount(price,percent=10):
    price=price-price*(1/percent)
    return price

print(apply_discount(2500))
print(apply_discount(2500,25))

# question 4 

count=5
while count>=1:
    print (count)
    count-=1
print("liftoff")

# commit statment variables, a loop, conditionals, and a function