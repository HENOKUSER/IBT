import React, { useState } from "react";

const TELEBIRR_REGEX = /^09\d{8}$/;

const initialFormData = {
  name: "",
  phone: "",
  area: "",
};

const DeliveryForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  const isPhoneValid = TELEBIRR_REGEX.test(formData.phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = () => {
    console.log("Order submitted:", formData);
    alert(
      `Order placed for ${formData.name}! We'll deliver to ${formData.area}.`,
    );
    setFormData(initialFormData);
  };

  return (
    <form className="delivery-form">
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
      <button type="button" onClick={handlePlaceOrder} disabled={!isPhoneValid}>
        Place Order
      </button>
    </form>
  );
};

export default DeliveryForm;
