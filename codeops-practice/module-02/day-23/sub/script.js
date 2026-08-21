// Application State
const state = {
  dishes: [],
  cart: [],
  search: "",
};

// DOM Elements - Main & Cart
const container = document.querySelector(".container");
const search = document.querySelector("#search");
const cartItemsContainer = document.querySelector("#cart-items");
const totalPriceEl = document.querySelector("#total-price");
const totalQuantityHeading = document.getElementById("total-quantity");

// DOM Elements - Checkout Form
const checkoutForm = document.querySelector("#checkout");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const areaInput = document.querySelector("#area");
const formErrorEl = document.querySelector("#form-error");

// Regex for Ethiopian mobile numbers (09xxxxxxxx or +2519xxxxxxxx)
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

// LocalStorage Helpers
function save() {
  localStorage.setItem("cart", JSON.stringify(state.cart));
}

function load() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    try {
      state.cart = JSON.parse(savedCart);
    } catch (e) {
      console.error("Failed to parse saved cart", e);
      state.cart = [];
    }
  }
}

// Fetch Menu Data
async function loadMenu() {
  container.textContent = "Loading...";

  try {
    const response = await fetch("menu.json");
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    state.dishes = await response.json();
    render();
  } catch (error) {
    container.textContent = "Could not load the menu";
  }
}

// Render Menu Cards
function render() {
  const searchTerm = state.search.toLowerCase();

  const filtered = state.dishes.filter((dish) => {
    return dish.name.toLowerCase().includes(searchTerm);
  });

  if (filtered.length === 0) {
    container.innerHTML = `<h3 class="dishNotFound">No such dishes found</h3>`;
    return;
  }

  container.innerHTML = filtered
    .map(
      (item) => `
        <div class="card" data-id="${item.id}">
          <img src="./images/${item.image}" alt="${item.name}" />
          <div class="title">${item.name}</div>
          <div class="category">${item.category}</div>
          <div class="spicy">${item.spicy ? "Spicy" : ""}</div>
          <div class="price">${item.price} ETB</div>
          <button class="add">Add</button>
        </div>
      `,
    )
    .join("");
}

// Search Handler
if (search) {
  search.addEventListener("input", (e) => {
    state.search = e.target.value;
    render();
  });
}

// Add to Cart Delegation
if (container) {
  container.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add");
    if (!addBtn) return;

    const card = addBtn.closest(".card");
    const dishId = Number(card.dataset.id);
    const selectedDish = state.dishes.find((dish) => dish.id === dishId);

    if (selectedDish) addToCart(selectedDish);
  });
}

function addToCart(dish) {
  const existingItem = state.cart.find((item) => item.id === dish.id);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    state.cart.push({ ...dish, qty: 1 });
  }

  save();
  renderCart();
}

// Compute Total ETB Price
function cartTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Render Cart UI
function renderCart() {
  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (totalQuantityHeading) {
    totalQuantityHeading.textContent = totalQty > 0 ? ` ${totalQty}` : "";
  }

  if (state.cart.length === 0) {
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = `<p class="emptyCart">Your cart is empty.</p>`;
    }
    if (totalPriceEl) totalPriceEl.textContent = "0 ETB";
    return;
  }

  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = state.cart
      .map(
        (item) => `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-info">
            <strong>${item.name}</strong>
            <span>${item.price} ETB × ${item.qty}</span>
          </div>
          <button class="remove-btn">Remove</button>
        </div>
      `,
      )
      .join("");
  }

  if (totalPriceEl) totalPriceEl.textContent = `${cartTotal()} ETB`;
}

// Remove Item Delegation
if (cartItemsContainer) {
  cartItemsContainer.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-btn");
    if (!removeBtn) return;

    const cartItem = removeBtn.closest(".cart-item");
    if (!cartItem) return;

    const id = Number(cartItem.dataset.id);
    state.cart = state.cart.filter((item) => item.id !== id);

    save();
    renderCart();
  });
}

// Form Validation Guard
function validate({ name, phone }) {
  if (!name.trim()) return "Please enter your name.";
  if (!PHONE_REGEX.test(phone.trim())) return "Enter a valid Ethiopian phone.";
  if (state.cart.length === 0) return "Your cart is empty.";
  return "";
}

// Checkout Submit Listener
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      name: nameInput.value,
      phone: phoneInput.value,
      area: areaInput ? areaInput.value : "Bole",
      paymentMethod: "TeleBirr",
    };

    const errorMsg = validate(data);
    if (formErrorEl) formErrorEl.textContent = errorMsg;

    if (errorMsg) return;

    placeOrder(data);
  });
}

// Order Submission & Confirmation
function placeOrder(data) {
  const order = {
    ...data,
    items: [...state.cart],
    total: cartTotal(),
    placedAt: new Date().toISOString(),
  };

  console.log("Order placed:", order);

  // Clear cart state & persist
  state.cart = [];
  save();
  renderCart();

  // Reset form inputs & clear errors
  if (checkoutForm) checkoutForm.reset();
  if (formErrorEl) formErrorEl.textContent = "";

  showConfirmation(order);
}

function showConfirmation(order) {
  alert(
    ` Order Placed Successfully!\n\n` +
      `Customer: ${order.name}\n` +
      `Payment: TeleBirr (${order.phone})\n` +
      `Delivery Area: ${order.area}\n` +
      `Total Paid: ${order.total} ETB\n\n` +
      `Thank you for your order!`,
  );
}

// Clean Application Initialization
async function init() {
  load();
  renderCart();
  await loadMenu();
}

init();
