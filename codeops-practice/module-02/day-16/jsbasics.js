// vaiable types
let name = "henok";
let age = 31;

const PI = 3.14;

var oldtype = "name";

let x;
let y = null;

console.log(name);
console.log(age);
console.log(oldtype);
console.log(x);
console.log(y);

// type of
console.log(typeof name);
console.log(typeof age);
console.log(typeof PI);
console.log(typeof NaN);
console.log(typeof oldtype);
console.log(typeof x);
console.log(typeof y);

// type cast
let Age = "35";
console.log(Number(Age));
console.log(typeof Age);
// operation and expresions

let sum = 12 + 12;
console.log(sum);

// operation
// 1. Arithmetic & assignment
console.log(480 + 20);
console.log(500 - 80);
console.log(12 * 35);
console.log(500 / 4);
console.log(17 % 5);
console.log(2 ** 3);

// Comparison & logical operators
const total = 1200; // ETB
const isMember = true;
// free delivery over 1000 OR member
const freeDelivery = total >= 1000 || isMember; // true
const bigMember = total > 1000 && isMember;

// ===  !==     >  <   >= <=   &&   ||   !

// Template literals   `    ${var}

console.log(`i am ${age} years old`);

// Control Flow

const score = 55; // module mark
if (score >= 70) {
  console.log("Pass — progress");
} else if (score >= 50) {
  console.log("Remedial plan");
} else {
  console.log("Retake the module");
}

// ternary operator

let conso =
  score >= 90
    ? "Pass — progress"
    : score >= 80
      ? "you have gotmore than 80"
      : score >= 70
        ? "you have gotmore than 70"
        : "you have go less than 70";
console.log(conso);
// switch

let paymentMethod = "CBE";

switch (paymentMethod) {
  case "CBE":
    console.log("CBE payment method");
    break;
  case "TeleBirr":
    console.log("Telebir payment method");
    break;
  default:
    console.log("Invalid payment method");
}

// loop

for (let i = 0; i <= 10; i++) {
  console.log(i);
}

let number = 1;
while (false) {
  console.log(number);
}

const menu = ["Doro Wat", "Tibs", "Shiro"];
// cleanest way to walk a list
for (const dish of menu) {
  console.log(dish);
}

// scope

// var xx = 30;
// let yy = 30;
// const pi = 30;
function myfunction() {
  var xx = 30;
  let yy = 30;
  const pi = 30;
  if (true) {
    console.log(pi);
  }
  //   console.log(xx);
  //   console.log(yy);
  //   console.log(pi);
}
myfunction();
console.log(x);
console.log(y);
// console.log(pi);

//  syntax error and sematicor logical  error

// console.log('xyz);

myfunction2(); // hoisting accessing before initializing the function

function myfunction2() {
  console.log("hello");
}

// funcction expersion

let funcexpresion = function () {
  return "hello world";
};

console.log(funcexpresion());
