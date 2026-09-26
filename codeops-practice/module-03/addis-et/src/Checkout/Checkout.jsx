import { useState, useRef } from "react";
import validate from "./validate";
import useCartStore from "../Cart/cartStore";
import placeOrder from "../Api/orders.js";
import styles from "./Checkout.module.css";

const PAYMENT_METHODS = [
  { id: "telebirr", label: "TeleBirr" },
  { id: "cbe", label: "CBE Birr / Mobile Banking" },
  { id: "cash", label: "Cash on Delivery" },
  { id: "amole", label: "Amole / Awash Birr" },
];

const Checkout = () => {
  const cart = useCartStore((state) => state.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const phoneRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    notes: "",
    paymentMethod: "",
  });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const errors = { ...validate(form), ...serverErrors };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length > 0) {
      setTouched({
        name: true,
        phone: true,
        address: true,
        email: true,
        paymentMethod: true,
      });
      return;
    }

    setSubmitting(true);
    try {
      await placeOrder(form);
      setForm({
        name: "",
        phone: "",
        address: "",
        email: "",
        notes: "",
        paymentMethod: "",
      });
      setTouched({});
      setServerErrors({});
    } catch (err) {
      setServerErrors(err.errors || {});
      if (err.errors?.phone) {
        phoneRef.current.focus();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Delivery & Checkout</h1>

        <div className={styles.field}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onBlur={() => handleBlur("name")}
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={
              touched.name && errors.name ? "name-error" : undefined
            }
          />
          {touched.name && errors.name && (
            <p id="name-error" role="alert" className={styles.error}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            ref={phoneRef}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            onBlur={() => handleBlur("phone")}
            aria-invalid={Boolean(touched.phone && errors.phone)}
            aria-describedby={
              touched.phone && errors.phone ? "phone-error" : undefined
            }
          />
          {touched.phone && errors.phone && (
            <p id="phone-error" role="alert" className={styles.error}>
              {errors.phone}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email (for receipt)</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={() => handleBlur("email")}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={
              touched.email && errors.email ? "email-error" : undefined
            }
          />
          {touched.email && errors.email && (
            <p id="email-error" role="alert" className={styles.error}>
              {errors.email}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="address">Delivery Address</label>
          <input
            type="text"
            id="address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            onBlur={() => handleBlur("address")}
            aria-invalid={Boolean(touched.address && errors.address)}
            aria-describedby={
              touched.address && errors.address ? "address-error" : undefined
            }
          />
          {touched.address && errors.address && (
            <p id="address-error" role="alert" className={styles.error}>
              {errors.address}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Delivery instructions, allergies, etc."
          />
        </div>

        <fieldset className={styles.paymentFieldset}>
          <legend>Payment Method</legend>
          {PAYMENT_METHODS.map((method) => (
            <label key={method.id} className={styles.paymentOption}>
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={form.paymentMethod === method.id}
                onChange={(e) =>
                  setForm({ ...form, paymentMethod: e.target.value })
                }
                onBlur={() => handleBlur("paymentMethod")}
              />
              {method.label}
            </label>
          ))}
          {touched.paymentMethod && errors.paymentMethod && (
            <p role="alert" className={styles.error}>
              {errors.paymentMethod}
            </p>
          )}
        </fieldset>

        <button disabled={submitting} className={styles.submitButton}>
          {submitting
            ? "Placing order..."
            : `Confirm Order & Pay — ETB ${total}`}
        </button>
      </form>

      <aside className={styles.summary}>
        <h2>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className={styles.summaryRow}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>ETB {item.price * item.quantity}</span>
          </div>
        ))}
        <div className={styles.summaryTotal}>
          <span>Grand Total</span>
          <span>ETB {total}</span>
        </div>
      </aside>
    </div>
  );
};

export default Checkout;
