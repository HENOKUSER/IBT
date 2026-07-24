# question  1 and 2 

class Node:
    def __init__(self, value: float):
        self.value = value
        self.left: 'Node | None' = None
        self.right: 'Node | None' = None


def insert(root: Node | None, value: float) -> Node:
    if root is None:
        return Node(value)
    
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
        
    return root

def in_order_traversal(node: Node | None) -> None:
    if node:
        in_order_traversal(node.left)
        print(node.value, end=" ")
        in_order_traversal(node.right)

def height(node: Node | None) -> int:
    if node is None:
        return 0      
    left_height = height(node.left)
    right_height = height(node.right)
    
    return 1 + max(left_height, right_height)


# question 3 and 4 

from collections import deque

def bfs(graph: dict, start: str) -> tuple[set, list]:
    visited = set([start])
    queue = deque([start])
    visit_order = []

    while queue:
        vertex = queue.popleft()
        visit_order.append(vertex)

        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return visited, visit_order


def dfs(graph: dict, start: str, visited: set | None = None, visit_order: list | None = None) -> tuple[set, list]:
    if visited is None:
        visited = set()
    if visit_order is None:
        visit_order = []

    visited.add(start)
    visit_order.append(start)

    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, visit_order)

    return visited, visit_order

# question 5
import heapq

def test_priority_queue():
    tasks = [
        (3, "Send Monthly Statements"),
        (1, "Process Fraud Alert"),
        (5, "Archive Daily Logs"),
        (2, "Calculate Savings Interest"),
        (4, "Update Account Statuses")
    ]

    min_heap = []

    for item in tasks:
        heapq.heappush(min_heap, item)

    print("Popping tasks by priority (lowest number = highest priority):")
    while min_heap:
        priority, task = heapq.heappop(min_heap)
        print(f"  [Priority {priority}] {task}")

print("=== 1 & 2: BST & Tree Depth ===")
balances = [2500.0, 1000.0, 5000.0, 500.0, 1500.0, 3000.0, 8000.0]

root = None
for b in balances:
    root = insert(root, b)

print("In-order traversal (Sorted Balances):")
in_order_traversal(root)
print()

tree_depth = height(root)
print(f"Tree Height/Depth: {tree_depth}")

print("\n=== 3 & 4: Graph BFS vs. DFS ===")
# Sample adjacency list representing account transfer connections
account_graph = {
    "ACC-001": ["CBE-001", "CBE-002"],
    "CBE-001": ["ACC-001", "ACC-002"],
    "CBE-002": ["ACC-001", "ACC-003"],
    "ACC-002": ["CBE-001"],
    "ACC-003": ["CBE-002"],
    "ISOLATED": []
}

start_node = "ACC-001"

bfs_reachable, bfs_order = bfs(account_graph, start_node)
dfs_reachable, dfs_order = dfs(account_graph, start_node)

print(f"BFS Reachable Vertices: {bfs_reachable}")
print(f"BFS Visit Order:        {bfs_order}")
print(f"DFS Visit Order:        {dfs_order}")

print("\n=== 5: Priority Queue ===")
test_priority_queue()
