transaction ="transactions.txt"
customers = {}    
current_name = ""
# 4 error handling for file not found
try:
    file = open(transaction, "r")
    #   1: Read the file line by line
except FileNotFoundError:
    print("Error: transactions.txt was not found.")
else:
    # STEP 1: Read the file line by line
    lines = file.readlines()
    print("Raw file contents:")
    for line in lines:
        print(line.strip()) 
# 2 find the total price for each customer and print in dictionary format
    for line in lines:
        line = line.strip()  
        if line == "":
            continue
        if line.startswith("name"):
            parts = line.split("=")         
            name_value = parts[1]        
            name_value = name_value.replace('"', "")
            current_name = name_value.strip()

        elif line.startswith("price"):
            parts = line.split("=")        
            price_value = parts[1].strip() 
            price_value = float(price_value)

            if current_name in customers:
                customers[current_name] = customers[current_name] + price_value
            else:
                customers[current_name] = price_value

    #  3 Print each customer and total, sorted highest first
    customer_list = []
    for name in customers:
        total = customers[name]
        customer_list.append([total, name])

    customer_list.sort(reverse=True) 

    print("Customer Totals (highest to lowest):")
    for pair in customer_list:
        total = pair[0]
        name = pair[1]
        print(f"name {name}: total price{total}")

    # STEP 5 : Write the same summary to report.txt
    report = open("report.txt", "w")
    report.write("Customer Totals (highest to lowest)\n")
    for pair in customer_list:
        name = pair[0]
        total = pair[1]
        report.write(f"name {name}: total price  {total}\n")
    report.close()

    print()
    print("Summary written to report.txt")
