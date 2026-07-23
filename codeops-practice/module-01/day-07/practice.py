# question 1

# ==============================================================================
# 1. LIST INDEX ACCESS -> O(1) Time
# ==============================================================================
# Explanation: Python lists are implemented internally as contiguous arrays of 
# memory pointers. Accessing an element by its index uses simple offset math:
# Memory_Address = Base_Address + (Index * Element_Size).
# This calculation takes constant time regardless of how large the list is.

items = [10, 20, 30, 40, 50]
value = items[3]  # O(1)


# ==============================================================================
# 2. DICTIONARY LOOKUP -> O(1) Average Time
# ==============================================================================
# Explanation: Python dictionaries use a hash table implementation. Key lookup
# involves running the key through a hash function to compute its index slot. 
# Finding or retrieving a value takes constant O(1) time on average.
# (Worst-case is O(n) during extreme hash collisions, but Python's siphash algorithm 
# makes this rare in practice).

user_data = {"id": 101, "name": "Abebe", "role": "Admin"}
name = user_data["name"]  # O(1)


# ==============================================================================
# 3. BINARY SEARCH -> O(log n) Time
# ==============================================================================
# Explanation: Binary search requires a sorted list. With each comparison, it 
# cuts the remaining search range in half. Doubling the size of the input list 
# (n) adds only 1 additional comparison step, making its growth logarithmic.

def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:  # O(log n)
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1


# ==============================================================================
# 4. SINGLE LOOP -> O(n) Time
# ==============================================================================
# Explanation: The loop executes its body once for every element in the sequence.
# If the length of the list (n) doubles, the number of operations doubles 
# proportionally, resulting in linear growth.

numbers = [1, 2, 3, 4, 5]
total = 0
for num in numbers:  # O(n)
    total += num


# ==============================================================================
# 5. NESTED LOOP -> O(n²) Time
# ==============================================================================
# Explanation: For every single iteration of the outer loop (which runs n times),
# the inner loop runs n times as well. The total number of operations performed
# is n × n = n², resulting in quadratic time complexity.

matrix_data = [1, 2, 3, 4]
pairs = []
for i in matrix_data:      # Runs n times
    for j in matrix_data:  # Runs n times for each outer iteration -> O(n²)
        pairs.append((i, j))


# question 2 
import time

DATA_SIZE = 100_000


account_list = [f"ACC-{i:06d}" for i in range(DATA_SIZE)]


account_dict = {f"ACC-{i:06d}": 1000.0 + i for i in range(DATA_SIZE)}

target_account = f"ACC-{DATA_SIZE - 5:06d}" 

start_time = time.perf_counter()
is_in_list = target_account in account_list
list_time = time.perf_counter() - start_time

start_time = time.perf_counter()
is_in_dict = target_account in account_dict
dict_time = time.perf_counter() - start_time


print(f"Target Account: {target_account}\n")

print(f"List Lookup Time : {list_time * 1000:.4f} ms")
print(f"Dict Lookup Time : {dict_time * 1000:.4f} ms\n")

if dict_time > 0:
    speedup = list_time / dict_time
    print(f"Result: Dictionary lookup was approx {speedup:,.0f}x faster!")


# question 3 

class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._items[-1]

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)

def reverse_names(names: list[str]) -> list[str]:
    stack = Stack()
    for name in names:
        stack.push(name)

    reversed_names = []
    while not stack.is_empty():
        reversed_names.append(stack.pop())
    return reversed_names

original_names = ["Abebe", "Kebede", "Chala", "Tigist", "Marta"]

reversed_list = reverse_names(original_names)

print("Original List:", original_names)
print("Reversed List:", reversed_list) 

# question 4 

from collections import deque

class BankQueue:
    def __init__(self):
        self._line = deque()

    def enqueue(self, customer_name: str):
        self._line.append(customer_name)
        print(f"{customer_name} joined the line.")
    def dequeue(self) -> str:
        if self.is_empty():
            raise IndexError("Cannot dequeue from an empty line.")
        customer = self._line.popleft()
        print(f"Served customer: {customer}")
        return customer

    def peek(self) -> str:
        if self.is_empty():
            raise IndexError("The line is empty.")
        return self._line[0]

    def is_empty(self) -> bool:
        return len(self._line) == 0

    def size(self) -> int:
        return len(self._line)

bank_line = BankQueue()

customers = ["Abebe", "Kebede", "Tigist", "Chala", "Marta"]
for customer in customers:
    bank_line.enqueue(customer)

print(f"\nTotal customers waiting: {bank_line.size()}")
print(f"Next in line to be served: {bank_line.peek()}\n")

print("--- 2. SERVE CUSTOMERS IN ORDER (FIFO) ---")
while not bank_line.is_empty():
    bank_line.dequeue()

print(f"\nAre any customers remaining? {not bank_line.is_empty()}")

# question 5 

from typing import Any, Optional

class Node:
    def __init__(self, value: Any, next_node: Optional["Node"] = None):
        self.value = value
        self.next: Optional["Node"] = next_node

class LinkedList:
    def __init__(self):
        self.head: Optional[Node] = None 

    def push_front(self, value: Any) -> None:
        new_node = Node(value, next_node=self.head)
        # Update head to point to the new node
        self.head = new_node

    def print_all(self) -> None:
        current = self.head

        if current is None:
            print("List is empty: None")
            return

        nodes = []
        while current is not None:
            nodes.append(str(current.value))
            current = current.next  

        print(" -> ".join(nodes) + " -> None")

ll = LinkedList()

print("--- PUSHING ELEMENTS TO FRONT ---")
# Inserting elements at the front
ll.push_front(10)
ll.push_front(20)
ll.push_front(30)
ll.push_front(40)

print("Current Linked List chain:")
ll.print_all()