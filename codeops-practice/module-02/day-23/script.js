// Embedded sample menu data replacing local JSON fetch fallback
const defaultMenu = [
  { id: 1, name: "Doro Wat", category: "Main", price: 240 },
  { id: 2, name: "Shiro", category: "Vegetarian", price: 120 },
  { id: 3, name: "Tibs", category: "Main", price: 280 },
  { id: 4, name: "Beyaynetu", category: "Vegetarian", price: 160 },
  { id: 5, name: "Firfir", category: "Breakfast", price: 130 },
];

// Single State Object Pattern
const state = {
  dishes: [],
  cart: [],
  search: "",
};

const menuEl = document.querySelector("#menu");
const cartListEl = document.querySelector("#cart-list");
const totalEl = document.querySelector("#cart-total");
const searchEl = document.querySelector("#search");

// Load initial data and restore persistent state
async function loadMenu() {
  try {
    const res = await fetch("data/menu.json");
    if (!res.ok) throw new Error("Local file fetch fallback");
    state.dishes = await res.json();
  } catch (err) {
    state.dishes = defaultMenu; // Load fallback dishes if standalone file isn't present
  }
  render();
}

function save() {
  localStorage.setItem("addiseats", JSON.stringify(state.cart));
}

function load() {
  const savedCart = localStorage.getItem("addiseats");
  if (savedCart) state.cart = JSON.parse(savedCart);
}

function cartTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Single Render Loop
function render() {
  // 1. Render Menu Grid
  const term = state.search.toLowerCase();
  const shown = state.dishes.filter((d) => d.name.toLowerCase().includes(term));

  if (shown.length === 0) {
    menuEl.innerHTML = `<p class="empty-msg">No dishes found matching "${state.search}"</p>`;
  } else {
    menuEl.innerHTML = shown
      .map(
        (d) => `
          <article class="dish" data-id="${d.id}">
            <h3>${d.name}</h3>
            <p class="category">${d.category}</p>
            <p class="price">${d.price} ETB</p>
            <button class="add">Add</button>
          </article>
        `,
      )
      .join("");
  }

  // 2. Render Cart
  renderCart();
}

function renderCart() {
  if (state.cart.length === 0) {
    cartListEl.innerHTML = `<li class="empty-msg">Your cart is empty.</li>`;
  } else {
    cartListEl.innerHTML = state.cart
      .map(
        (item) => `
          <li class="cart-item" data-id="${item.id}">
            <div>
              <strong>${item.name}</strong>
              <div>${item.price} ETB x ${item.qty}</div>
            </div>
            <button class="rm">Remove</button>
          </li>
        `,
      )
      .join("");
  }
  totalEl.textContent = cartTotal().toLocaleString();
}

// Event Listeners & Event Delegation
searchEl.addEventListener("input", (e) => {
  state.search = e.target.value;
  render();
});

menuEl.addEventListener("click", (e) => {
  if (!e.target.matches(".add")) return;
  const id = Number(e.target.closest(".dish").dataset.id);
  const dish = state.dishes.find((d) => d.id === id);
  const line = state.cart.find((i) => i.id === id);

  if (line) {
    line.qty++;
  } else {
    state.cart.push({ ...dish, qty: 1 });
  }
  save();
  render();
});

document.querySelector("#cart").addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) return;
  const id = Number(e.target.closest(".cart-item").dataset.id);
  state.cart = state.cart.filter((i) => i.id !== id);
  save();
  render();
});

// App Initialization
async function init() {
  load();
  await loadMenu();
}

init();
