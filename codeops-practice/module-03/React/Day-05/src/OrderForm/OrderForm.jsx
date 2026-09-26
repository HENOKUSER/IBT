import { useState } from "react";

const OrderForm = () => {
  const phoneValidate = /^(?:0|\+251)[97]\d{8}$/;

  const [formInput, setFormInput] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const disable = phoneValidate.test(formInput.phone);

  return (
    <div>
      <label htmlFor="fullName">Full name:</label>
      <br />
      <input
        type="text"
        id="fullName"
        value={formInput.name}
        onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
      />
      <br />
      <label htmlFor="phone">phone:</label>
      <br />
      <input
        type="tel"
        id="phone"
        value={formInput.phone}
        onChange={(e) => setFormInput({ ...formInput, phone: e.target.value })}
      />
      <br />
      <label htmlFor="area">Area:</label>
      <br />
      <input
        type="text"
        id="area"
        value={formInput.area}
        onChange={(e) => setFormInput({ ...formInput, area: e.target.value })}
      />
      <br />
      <button disabled={!disable}> place order</button>
    </div>
  );
};

export default OrderForm;
