const pattern = /^09\d{8}$/;
console.log(pattern.test("0912345678")); // true
console.log(pattern.test("12345")); // false

const digit = /[0-9]/;
console.log(digit.test(45)); // false

const both = / ?\d\w/;

console.log(both.test("5a"));

const PHONE = /^(?:\+251|0)9\d{8}$/;

PHONE.test("0912345678"); // true
PHONE.test("+251912345678"); // true
// a simple email check
const EMAIL = /^[\w.]+@[\w.]+\.\w+$/;
EMAIL.test("almaz@example.et"); // true
