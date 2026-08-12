let array = [1, 2, 3];
console.log(array);

let obj = {
  name: "henok",
  section: "SQ5",
  skills: ["python", "html", "css", "js"],
};

console.log(obj);
console.log(array);
console.log(typeof array);

// bult in method in arry
array.push(5);
console.log(array);
array.pop();
console.log(array);
array.includes(4);
console.log(array);
// map filter reduce sort

// map

const pricesInUSD = [10, 20, 50, 100];

// Convert USD prices to ETB (assuming 1 USD = 120 ETB)
const pricesInETB = pricesInUSD.map((price) => price * 120);

console.log(pricesInETB); // [1200, 2400, 6000, 12000]
console.log(pricesInUSD); // [10, 20, 50, 100] (original is unchanged)

// filter

const prices = [15, 250, 42, 800, 95];

// Keep only prices greater than or equal to 100
const expensivePrices = prices.filter((price) => price >= 100);

console.log(expensivePrices); // [250, 800]
console.log(prices); // [15, 250, 42, 800, 95] (original is unchanged)

//reduce
const cartPrices = [120, 450, 300, 50];

// Calculate total cart sum starting at 0
const total = cartPrices.reduce((accumulator, price) => {
  return accumulator + price;
}, 0);

console.log(total); // 920

// object
const user = {
  name: "Abebe",
  age: 28,
  "favorite item": "Laptop", // Multi-word keys require quotes
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};

// Dot notation (standard)
console.log(user.name); // "Abebe"

// Bracket notation (required for variables or spaces)
const propertyKey = "age";
console.log(user[propertyKey]); // 28
console.log(user["favorite item"]); // "Laptop"

const dtcCodes = ["P0171", "P0300", "P0420", "P0455", "P0174"];
const filtered = dtcCodes.filter((startwith) => startwith.startsWith("P"));
console.log(filtered);

const maped = filtered.map((mapped) => `Code : ${mapped} `);

console.log(maped);

const traineeScores = [45, 62, 85, 90, 58, 77, 81, 100, 30, 68];

const counts = traineeScores.reduce(
  (acc, score) => {
    if (score >= 80 && score <= 100) {
      acc["80-100"]++;
    } else if (score >= 60 && score <= 79) {
      acc["60-79"]++;
    } else if (score >= 0 && score <= 59) {
      acc["0-59"]++;
    }
    return acc;
  },
  { "0-59": 0, "60-79": 0, "80-100": 0 },
);

console.log(counts);

const vehicle = {
  make: "Toyota",
  model: "Vitz",
  rpm: 850,
  describe() {
    // shorthand method syntax -- equivalent to describe: function() {...}
    return `${this.make} ${this.model} is idling at ${this.rpm} RPM`;
  },
  revEngine(amount) {
    this.rpm += amount; // 'this' lets the method mutate its own object
    return this.rpm;
  },
};
console.log(vehicle.describe()); // "Toyota Vitz is idling at 850 RPM"
console.log(vehicle.revEngine(200)); // 1050, and vehicle.rpm is now 1050

const reading = { sensor: "TPS", rpm: 900, ok: true, timestamp: "08:00" };
const { sensor, rpm } = reading;
