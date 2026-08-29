import React, { useState } from "react";
import DeliveryForm from "./DeliveryForm";
import "../style/globale.css";

const SideBar = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="SideBar">
      <h1>sidebar</h1>
      <button className="order-btn" onClick={handleToggle}>
        {showForm ? "Hide Order Form" : "Order Now"}
      </button>
      {showForm && <DeliveryForm />}
    </div>
  );
};

export default SideBar;
