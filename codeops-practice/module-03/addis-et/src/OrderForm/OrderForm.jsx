import { useState } from "react";

const OrderForm = () => {
  const [formInputs, setFormInputs] = useState({
    id: Date.now(),
    name: "",
    phone: "",
    address: "",
  });

  const phone = /^(?:0|\+251)?[97]\d{8}$/;
  const phoneValidate = phone.test(formInputs.phone);

  const nameValidate = formInputs.name.trim().length > 2;
  const addressValidate = formInputs.address.trim().length > 2;

  const validateCondition = nameValidate && phoneValidate && addressValidate;

  const handleInput = (e) => {
    e.preventDefault();

    if (validateCondition) {
      console.log("Order placed:", formInputs);
      setFormInputs({ id: Date.now(), name: "", phone: "", address: "" });
    }
  };
  return (
    <div>
      <form onSubmit={handleInput}>
        <label htmlFor="name">Full name:</label>
        <br />
        <input
          type="text"
          id="name"
          value={formInputs.name}
          onChange={(e) =>
            setFormInputs({ ...formInputs, name: e.target.value })
          }
        />
        <br />
        <label htmlFor="phone">phone</label>
        <br />
        <input
          type="tel"
          id="phone"
          value={formInputs.phone}
          onChange={(e) =>
            setFormInputs({ ...formInputs, phone: e.target.value })
          }
        />
        <br />
        <label htmlFor="Address">Address</label>
        <br />
        <input
          type="text"
          id="Address"
          value={formInputs.address}
          onChange={(e) =>
            setFormInputs({ ...formInputs, address: e.target.value })
          }
        />
        <br />
        <button disabled={!validateCondition}>Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;



