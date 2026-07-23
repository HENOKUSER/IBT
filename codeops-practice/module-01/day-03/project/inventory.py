'''
 A program inventory.py for a small Addis Ababa pharmacy that loads stock from a file into a
dictionary, lets you update quantities, reports low-stock items, and saves the updated stock back to the file.
'''

# WE would have a txt file to read from and write to it .
# read and update and save to the file 

stock={}

try:
    with open("stock.txt","r") as file:
        for line in file:
            line = line.strip() 
            if line: 
                item, qty = line.split(",")
                stock[item.strip()] = int(qty.strip())

except FileNotFoundError:
    print("file not find ")

def modify(medicen,amount):
    AvaliableAmount=stock.get(medicen,0)
    stock[medicen]=AvaliableAmount+amount
    print(f"updated {medicen} new stock is {stock[medicen]}")

modify("Paracetamol", -45)  # Sold 45
modify("Amoxicillin", 15)

low_stock = {item: qty for item, qty in stock.items() if qty < 10}


for item, qty in low_stock.items():
    print(f"{item}: {qty}")

with open("stock.txt", "w") as file:
    for item, qty in stock.items():
        file.write(f"{item},{qty}\n")
        
