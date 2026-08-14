"use strict";

const form = document.querySelector("#submit");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#tel");

const nameError = document.querySelector("#name-error");
const phoneError = document.querySelector("#phone-error");
const countDisplay = document.querySelector("#count-display");

const ethPhoneRegex = /^(?:\+251|0)[79]\d{8}$/;

function showError(element, message) {
  element.textContent = message;
  element.style.display = "block";
}

function clearErrors() {
  nameError.textContent = "";
  nameError.style.display = "none";
  phoneError.textContent = "";
  phoneError.style.display = "none";
}

function updateCountDisplay() {
  const signups = JSON.parse(localStorage.getItem("signups")) || [];
  countDisplay.textContent = `Signed up users: ${signups.length}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const nameVal = nameInput.value.trim();
  const phoneVal = phoneInput.value.trim();
  let isValid = true;

  if (!nameVal || nameVal.length < 2) {
    showError(nameError, "Please enter a valid name (at least 2 characters).");
    isValid = false;
  }

  if (!ethPhoneRegex.test(phoneVal)) {
    showError(
      phoneError,
      "Please enter a valid phone number (e.g., 0912345678 or +251912345678).",
    );
    isValid = false;
  }

  if (!isValid) return;

  const signups = JSON.parse(localStorage.getItem("signups")) || [];
  signups.push({ name: nameVal, phone: phoneVal });
  localStorage.setItem("signups", JSON.stringify(signups));

  nameInput.value = "";
  phoneInput.value = "";

  updateCountDisplay();
});

updateCountDisplay();
