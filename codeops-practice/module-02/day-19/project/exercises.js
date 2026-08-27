"use strict";
// 1
const header1 = document.querySelector(".heading");
console.log(header1.textContent);
header1.textContent = "hello world ";
console.log(header1.textContent);
// header1.style.backgroundColor = "antiquewhite";
// 2
header1.classList.toggle("head");
const ul = document.createElement("ul");
const li1 = document.createElement("li");
const li2 = document.createElement("li");
const li3 = document.createElement("li");

header1.append(ul);
li1.textContent = "addis abeba";
li2.textContent = "wolkite";
li3.textContent = "semera";
ul.append(li1);
ul.append(li2);
ul.append(li3);
// 3
const button = document.querySelector("#btn");
button.addEventListener("click", () => {
  event.target;
  console.log("butto clicked");

  const button = document.getElementById("my-button");
  const container = document.getElementById("container");

  button.addEventListener("click", (event) => {
    console.log("event.target:", event.target);
  });
});
container.addEventListener("click", (event) => {
  console.log("event.target:", event.target);
});

// 4
const item1 = document.querySelector("#item1");
const del1 = document.querySelector("#delbtn1");
del1.addEventListener("click", () => {
  item1.remove();
  del1.remove();
});
const item2 = document.querySelector("#item2");
const del2 = document.querySelector("#delbtn2");
del2.addEventListener("click", () => {
  item2.remove();
  del2.remove();
});
const item3 = document.querySelector("#item3");
const del3 = document.querySelector("#delbtn3");
del3.addEventListener("click", () => {
  item3.remove();
  del3.remove();
});
// 5

const form = document.querySelector("#form");
const txinput = document.querySelector("#name");
const submitbtn = document.querySelector("#submit");
const inputul = document.querySelector("#inputul");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputli = document.createElement("li");
  inputli.textContent = txinput.value;
  inputul.append(inputli);
  txinput.value = "";
});
