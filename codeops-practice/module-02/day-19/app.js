// State: Single source of truth
let items = [
  { id: 1, text: "Bananas", done: false },
  { id: 2, text: "Orange", done: true },
];

// Select DOM elements (matching index.html IDs)
const form = document.querySelector("#add-form");
const input = document.querySelector("#name");
const list = document.querySelector("#list");
const countDisplay = document.querySelector("#item-count");

// Render UI based on state
function render() {
  list.innerHTML = items
    .map(
      (item) => `
    <li data-id="${item.id}" class="${item.done ? "done" : ""}">
      <span class="toggle-item">${item.text}</span>
      <button class="delete-btn">Remove</button>
    </li>
  `,
    )
    .join("");

  const remaining = items.filter((item) => !item.done).length;
  countDisplay.textContent = `${remaining} item${remaining === 1 ? "" : "s"} remaining`;
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();

  if (!text) return;

  items.push({
    id: Date.now(),
    text: text,
    done: false,
  });

  input.value = "";
  render();
});

// Event Delegation for toggling and deleting
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  // Remove item
  if (e.target.classList.contains("delete-btn")) {
    items = items.filter((item) => item.id !== id);
    render();
    return;
  }

  // Toggle item done status
  items = items.map((item) => {
    if (item.id === id) {
      return { ...item, done: !item.done };
    }
    return item;
  });

  render();
});

// Initial Render
render();
