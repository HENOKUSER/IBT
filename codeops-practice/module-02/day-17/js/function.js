function myfunc() {
  console.log(`hello ${name}`);
}

myfunc();

function myfunc1(name) {
  console.log(`hello ${name}`);
}

console.log(myfunc1("henok", "heran"));

function myfunc2(...name) {
  console.log(`hello ${name}`);
}

console.log(myfunc1("henok", "heran"));

// ... give an input in array form

// function expression

let greeting = function greeting() {
  console.log("hello world ");
};

console.log(greeting());

let sum = function sum(num1, num2) {
  return num1 + num2;
};
console.log(sum(55, 63));

// arrow function

let sum2 = (num1, num2) => {
  return num1 + num2;
};

console.log(sum2(65, 89));

// clouser
function createCounter() {
  let count = 0; // Private variable in outer scope

  return function increment() {
    count++; // Inner function captures 'count'
    return count;
  };
}

const counter = createCounter(); // createCounter finishes executing here

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

function parernt() {
  let parent = "heran";
  return function child(ChildName) {
    console.log(`my name is ${parent}`);
  };
}

let parentName = parernt();
console.log(parentName());

// higher order function

function adder(numb1, numb2, func) {
  return func(numb1, numb2);
}

function sumation(n1, n2) {
  return n1 + n2;
}

console.log(adder(2, 6, sumation));



