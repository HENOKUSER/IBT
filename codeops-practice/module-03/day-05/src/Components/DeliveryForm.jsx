import React, { useState } from "react";
import { useCart } from "../Components/CartProvider";

const TELEBIRR_REGEX = /^09\d{8}$/;

const initialFormData = {
  name: "",
  phone: "",
  area: "",
};

const DeliveryForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { items, total, dispatch } = useCart();

  const isPhoneValid = TELEBIRR_REGEX.test(formData.phone);
  const canPlaceOrder = isPhoneValid && items.length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = () => {
    console.log("Order submitted:", formData, items);
    alert(
      `Order placed for ${formData.name}! We'll deliver to ${formData.area}.`,
    );
    setFormData(initialFormData);
    dispatch({ type: "CLEAR" });
  };

  return (
    <form className="delivery-form">
      {items.length > 0 ? (
        <ul className="cart-summary">
          {items.map((item) => (
            <li key={item.id}>
              {item.name} x{item.qty} — {item.price * item.qty} ETB
              <button
                type="button"
                onClick={() => dispatch({ type: "REMOVE", payload: item.id })}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}

      <p className="cart-total">Total: {total} ETB</p>

      <input
        type="text"
        name="name"
        placeholder="Full name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="TeleBirr number (09XXXXXXXX)"
        value={formData.phone}
        onChange={handleChange}
      />
      {formData.phone && !isPhoneValid && (
        <p className="field-error">Enter a valid TeleBirr number.</p>
      )}
      <input
        type="text"
        name="area"
        placeholder="Delivery area"
        value={formData.area}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={!canPlaceOrder}
      >
        Place Order
      </button>
    </form>
  );
};

export default DeliveryForm;
