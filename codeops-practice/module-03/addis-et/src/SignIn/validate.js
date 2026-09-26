function validate(form) {
  const errors = {};

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }

  if (form.password.length === 0) {
    errors.password = "Password is required";
  }

  return errors;
}

export default validate;
