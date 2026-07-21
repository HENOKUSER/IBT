
    # todays lesson 
    # lsit and tuples 
    # dictionaries and sets
    # Comprehensions & Modules
    # Files & Error Handling


# collection & modules


# FILE AND ERROR HANDLING 


# opening a file and reading its content line by line

with open("note.txt", "r") as file:
    content = file.read()

print("--- File Contents ---")
print(content)


# writing to a file 
# OVERWRITE MODE
with open("note.txt", "w") as file:
    file.write("This is a new line.\n")
    file.write("This will overwrite the existing content.\n")



