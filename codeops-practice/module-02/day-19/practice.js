"use strict";
// selecting elements
// by id — one element
const list = document.getElementById("item1");
console.log(list);
// CSS selector — FIRST match
const title = document.querySelector("h1");
console.log(title);
const first = document.querySelector(".item");
// CSS selector — ALL matches (NodeList)
console.log(first);
const items = document.querySelectorAll(".item");
items.length; // 2
console.log(items);

// Reading content & values
const h1 = document.querySelector("h1");
h1.textContent; // "Addis Market"
console.log(h1);
// form field value
const input = document.querySelector(".list");
input.textContent; // "3" (always a string!)
console.log(input.textContent);
// attributes & data-*
const li = document.querySelector(".item");
console.log(li.getAttribute("class"));

// Changing text, HTML & styles
console.log(`conntent before : ${h1.textContent}`);
h1.textContent = "fruits list";
console.log(`conntent after : ${h1.textContent}`);

// classes — prefer this over inline styles
h1.classList.add("active");
h1.classList.remove("hidden");
h1.classList.toggle("done");
// direct style when you must
h1.style.color = "crimson";

// Creating & inserting elements

const list2 = document.querySelector("#list");
// 1. make an element
const lit = document.createElement("li");
// 2. fill it
lit.textContent = "Shiro";
lit.classList.add("item");
lit.dataset.id = "12";
// 3. put it in the tree
list.append(lit); // add to end
list.prepend(lit); // add to start

// Removing & replacing;
const li3 = document.querySelector(".item");
// remove this element from the page
li3.remove();
// clear an entire list
const list3 = document.querySelector("#item2");
// list3.innerHTML = "";

// reading a list from data
const cart = [
  { name: "Teff", qty: 2 },
  { name: "Berbere", qty: 1 },
];
function render() {
  const list = document.querySelector(".list");
  list.innerHTML = ""; // clear
  cart.forEach((item) => {
    // rebuild
    const li = document.createElement("li");
    li.textContent = `${item.name} × ${item.qty}`;
    list.append(li);
  });
}
render();

// addEventListener & the event object
const btn = document.querySelector("#add");
// element, event name, handler function
btn.addEventListener("click", function (e) {
  console.log("clicked!");
  e.target; // the element clicked
});
// arrow handler is common too
btn.addEventListener("click", (e) => {
  handleAdd();
});
