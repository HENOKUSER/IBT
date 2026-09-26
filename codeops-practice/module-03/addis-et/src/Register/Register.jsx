import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import validate from "./validate";
import styles from "./Register.module.css";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const errors = validate(form);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError(null);

    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length > 0) {
      setTouched({
        name: true,
        phone: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    setSubmitting(true);
    try {
      register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const field = (name, label, type = "text") => (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        onBlur={() => handleBlur(name)}
        aria-invalid={Boolean(touched[name] && errors[name])}
        aria-describedby={
          touched[name] && errors[name] ? `${name}-error` : undefined
        }
      />
      {touched[name] && errors[name] && (
        <p id={`${name}-error`} role="alert" className={styles.fieldError}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <h1 className={styles.title}>Create Your Mesob House Account</h1>
        <p className={styles.subtitle}>
          Join our culinary heritage circle in less than a minute.
        </p>

        {serverError && (
          <p role="alert" className={styles.error}>
            {serverError}
          </p>
        )}

        {field("name", "Full Name")}
        {field("phone", "Ethiopian Mobile Number", "tel")}
        {field("email", "Email Address", "email")}

        <div className={styles.row}>
          {field("password", "Password", "password")}
          {field("confirmPassword", "Confirm Password", "password")}
        </div>

        <button disabled={submitting} className={styles.submitButton}>
          {submitting ? "Creating account..." : "Create Account"}
        </button>

        <p className={styles.signInLink}>
          Already part of our dining family?{" "}
          <Link to="/signin">Sign in here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
