# question 1

def total(nums: list):
    if not nums:
        return 0
    return nums[0] + total(nums[1:])


def count_down(n: int):
    if n <= 0:
        return
    print(n)
    count_down(n - 1)

# Example Usage
print("Total:", total([10.5, 20.0, 5.25])) 
print("Counting down:")
count_down(3) 

# question 2

def binary_search(items: list, target) -> int:
    low, high = 0, len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1

balances = [120.50, 450.00, 1200.75, 3400.00, 8900.20]
target_balance = 1200.75

idx = binary_search(balances, target_balance)
print(f"Index of {target_balance}: {idx}")
print(
    f"Index of non-existent target: {binary_search(balances, 500.00)}"
)  

#  question 3
import random

def merge(left: list, right: list):
    merged = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged

def merge_sort(items: list):
    if len(items) <= 1:
        return items

    mid = len(items) // 2
    left_sorted = merge_sort(items[:mid])
    right_sorted = merge_sort(items[mid:])

    return merge(left_sorted, right_sorted)

sample_list = [random.randint(1, 100) for _ in range(15)]
print(f"Original: {sample_list}")
print(f"Merge Sort Result: {merge_sort(sample_list)}")
print(
    f"Matches Python's sorted(): {merge_sort(sample_list) == sorted(sample_list)}"
)

# question 4

accounts = [("Alice", 1200.75), ("Bob", 450.00), ("Charlie", 8900.20), ("Diana", 3400.00)]

sorted_accounts = sorted(accounts, key=lambda item: item[1], reverse=True)

print(sorted_accounts)

# question 5

def has_pair(nums: list, target):
    left = 0
    right = len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return False

sorted_nums = [10, 25, 40, 50, 75, 100]

print(has_pair(sorted_nums, 64)) 
print(has_pair(sorted_nums, 100))


