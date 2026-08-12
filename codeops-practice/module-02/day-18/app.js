import { addVat, VAT } from "./money.js";

const amount = 500;
export const totalPayment = addVat(amount);
