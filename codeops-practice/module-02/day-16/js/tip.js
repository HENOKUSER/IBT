// console.log("hello world");
const rawBill = "450";
const rawPartySize = "3";

let bill = Number(rawBill);
let patySize = Number(rawPartySize);

if (bill > 300) {
  bill += bill * 0.1;
} else {
  bill += bill * 0.05;
}

let total = bill * patySize;

let perPerson = total / patySize;

console.log(`the total bill is ${total} and each person will pay ${perPerson}`);

let teleServiceFee = 0.4;
let cbeServiceFee = 0.7;

let serviceProvider = "telebirr";
switch (serviceProvider) {
  case "telebirr":
    total += total * teleServiceFee;
    break;
  case "cbe":
    total += total * cbeServiceFee;
    break;
   default:
    console.log("choose right service provider")
}
