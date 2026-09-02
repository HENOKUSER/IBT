// DOM references
const cardContainer = document.querySelector(".cardContainer");
const searchInput = document.querySelector(".searchBox input");
const searchBtn = document.querySelector(".searchBox button");
const navButtons = document.querySelectorAll(".navLinks button");

const noresults = document.querySelector(".noresults");

const cartItems = document.querySelector(".cartItems");

let menuItems = [];
let cart = [];

async function fetchMenuItems() {
  try {
    const response = await fetch("menu.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    menuItems = data;

    renderMenuItems(menuItems);

    // console.log("Fetched menu items:", menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
  }
}

function renderMenuItems(items) {
  cardContainer.innerHTML = "";
  items.map((item) => {
    const card = document.createElement("div");
    card.classList.add("cards");
    card.innerHTML = `
        <img class="image" src="./images/${item.image}" alt="${item.name}" />
        <div class="menudescription">
            <h3 class="title">${item.name}</h3>
            ${item.spicy ? '<p class="spicy">spicy</p>' : ""}
            <p class="price">${item.price}</p>
            <button data-id="${item.id}" class="addToCart">Add to Cart</button>
        </div>
    `;
    cardContainer.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    renderMenuItems(menuItems);
    return;
  } else {
    filterMenuItemsByCategory(searchTerm);
  }
});

function filterMenuItemsByCategory(category) {
  //   cardContainer.innerHTML = "";
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(category),
  );
  if (filteredItems.length === 0) {
    cardContainer.innerHTML = "<p class='noresults'>No items found.</p>";
    return;
  }
  renderMenuItems(filteredItems);
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    const filterCategory = menuItems.filter((item) => {
      if (item.category.toLowerCase() == category.toLowerCase()) {
        return item;
      } else if (category.toLowerCase() === "all") {
        return item;
      }
    });
    renderMenuItems(filterCategory);
  });
});

async function init() {
  loadCartFromStorage();
  await fetchMenuItems(); // this already calls renderMenuItems, not renderCart
  renderCart(); // render whatever was restored from localStorage
}

const makepayment = document.querySelector(".makePayment");
// const placeorder = document.querySelector(".makePayment");
const paymentForm = document.querySelector(".paymentForm");

const modalOverlay = document.querySelector(".modalOverlay");

makepayment.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Add an item before placing an order.");
    return;
  }
  modalOverlay.classList.add("show");
});

const nameError = document.querySelector(".nameError");
const phoneError = document.querySelector(".phoneError");
const addressError = document.querySelector(".addresserror");

paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  const fullname = document.getElementById("fullname").value.trim();
  const phonenumber = document.getElementById("phonenumber").value.trim();
  const address = document.getElementById("address").value.trim();

  // Reset errors first
  nameError.textContent = "";
  phoneError.textContent = "";
  addressError.textContent = "";

  if (fullname.length < 2) {
    nameError.textContent = "Please enter your full name.";
    isValid = false;
  }

  const phonePattern = /^(09|07)\d{8}$/; // e.g. 0912345678
  if (!phonePattern.test(phonenumber)) {
    phoneError.textContent = "Enter a valid phone number (e.g. 0912345678).";
    isValid = false;
  }

  if (address.length < 3) {
    addressError.textContent = "Please enter your address.";
    isValid = false;
  }

  if (!isValid) return; // stop here — leave the modal open with errors showing

  // Success path
  alert("Order placed successfully!");
  cart = [];
  renderCart();
  paymentForm.reset();
  modalOverlay.classList.remove("show");
});

cardContainer.addEventListener("click", (e) => {
  const clikedButton = e.target.closest(".addToCart");
  if (!clikedButton) return;

  const itemId = Number(clikedButton.dataset.id);

  const item = menuItems.find((item) => item.id === itemId);

  if (!item) return;

  const existingCartItem = cart.find((cartItem) => cartItem.id === itemId);

  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  renderCart();
});

cartItems.addEventListener("click", (event) => {
  const removeBtn = event.target.closest(".removeItem");
  if (!removeBtn) return;

  const itemId = Number(removeBtn.dataset.id);
  cart = cart.filter((item) => item.id !== itemId);

  renderCart();
});
// ---- Empty cart message (inside renderCart) ----
function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.classList.add("emptyCart");
    emptyMsg.textContent = "Your cart is empty.";
    cartItems.appendChild(emptyMsg);

    document.querySelector(".total").textContent = "0 ETB";
    makepayment.disabled = true;
    saveCartToStorage();
    return;
  }

  makepayment.disabled = false;

  cart.forEach((item) => {
    const cartContainerEl = document.createElement("div");
    cartContainerEl.classList.add("cartcontainer");

    const selectedItem = document.createElement("p");
    selectedItem.classList.add("selectedItem");
    selectedItem.textContent = item.name;

    const itemquantity = document.createElement("div");
    itemquantity.classList.add("itemquantity");

    const editquantity = document.createElement("div");
    editquantity.classList.add("editquantity");

    const quantityInput = document.createElement("input");
    quantityInput.classList.add("quantityInput");
    quantityInput.type = "number";
    quantityInput.value = item.quantity;
    quantityInput.min = 1;
    quantityInput.dataset.id = item.id;

    const itemTotalPrice = document.createElement("p");
    itemTotalPrice.classList.add("itemTotalPrice");
    itemTotalPrice.textContent = `${item.price * item.quantity} ETB`;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeItem");
    removeBtn.dataset.id = item.id;
    removeBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    editquantity.appendChild(quantityInput);
    itemquantity.appendChild(editquantity);
    itemquantity.appendChild(itemTotalPrice);
    cartContainerEl.appendChild(selectedItem);
    cartContainerEl.appendChild(itemquantity);
    cartContainerEl.appendChild(removeBtn);

    cartItems.appendChild(cartContainerEl);
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  document.querySelector(".total").textContent = `${total} ETB`;

  saveCartToStorage();
}

// ---- localStorage save/load ----
function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
  const stored = localStorage.getItem("cart");
  cart = stored ? JSON.parse(stored) : [];
}

cartItems.addEventListener("input", (event) => {
  if (!event.target.classList.contains("quantityInput")) return;

  const itemId = Number(event.target.dataset.id);
  const cartItem = cart.find((item) => item.id === itemId);
  if (!cartItem) return;

  const newQty = Number(event.target.value);
  cartItem.quantity = newQty > 0 ? newQty : 1;

  renderCart();
});

const cancelOrder = document.querySelector(".cancelOrder");

cancelOrder.addEventListener("click", () => {
  modalOverlay.classList.remove("show");
  paymentForm.reset();
  nameError.textContent = "";
  phoneError.textContent = "";
  addressError.textContent = "";
});

init();
