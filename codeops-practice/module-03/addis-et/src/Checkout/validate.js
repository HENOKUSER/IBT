function validate(form) {
  const errors = {};

  if (form.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!/^(?:0|\+251)?[97]\d{8}$/.test(form.phone)) {
    errors.phone = "Enter a valid TeleBirr phone number";
  }

  if (form.address.trim().length < 3) {
    errors.address = "Delivery area must be at least 3 characters";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!form.paymentMethod) {
    errors.paymentMethod = "Select a payment method";
  }

  return errors;
}

export default validate;
