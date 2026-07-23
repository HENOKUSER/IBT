# question 1 
cities_list=[
    "addis abeba","jima","adama","sebeta","gonder","addis abeba" ,"weldya","adama","sebeta","addis abeba"
            ]
cities=set(cities_list)
print(cities)
print(len(cities_list))
print(len(cities))

# question 2 
grocery_items = {
           "bira":75,
           "weyn":1500,
           "draft":60,
           "tekesno":670
}
for item,price in grocery_items.items():
    print(f"{item} costs {price} ETB")

# question 3 

prices = [100, 250, 400, 80]

taxed_price=[price*1.15 for price in prices]

print(f"price after tax is added {taxed_price} ")



# question 4
cheap_item=[price for price in prices if price<200
            ]
print(cheap_item)    


# question 6 

with open("names.txt","w")as f :
    f.write("henok \n")
    f.write("slase \n")
    f.write("heran \n")

with open ("names.txt")as f :
    names=f.read().split()
    for name in names:
        print(name)

# question 7

try:
    user_input=float(input("enter a number "))
    divid=1000/user_input
except ZeroDivisionError:
    print("you must enter non zero number")
except ValueError:
    print("you must enter number it won't accept letter")
else:
    print(divid)
finally:
    print("good your input is correct anf you got the result")  

    


