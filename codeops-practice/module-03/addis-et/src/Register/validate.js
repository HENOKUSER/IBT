function validate(form) {
  const errors = {};

  if (form.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!/^(?:0|\+251)?[97]\d{8}$/.test(form.phone)) {
    errors.phone = "Enter a valid Ethiopian mobile number";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }

  if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export default validate;
