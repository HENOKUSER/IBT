import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import validate from "./validate";
import styles from "./SignIn.module.css";

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
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
      setTouched({ email: true, password: true });
      return;
    }

    setSubmitting(true);
    try {
      login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <h1 className={styles.title}>Welcome to the Mesob Table</h1>
        <p className={styles.subtitle}>
          Sign in to manage your feasts, TeleBirr rewards, and reserved dining
          mesobs.
        </p>

        {serverError && (
          <p role="alert" className={styles.error}>
            {serverError}
          </p>
        )}

        <div className={styles.field}>
          <label htmlFor="email">Email Address</label>
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
            <p id="email-error" role="alert" className={styles.fieldError}>
              {errors.email}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onBlur={() => handleBlur("password")}
            aria-invalid={Boolean(touched.password && errors.password)}
            aria-describedby={
              touched.password && errors.password ? "password-error" : undefined
            }
          />
          {touched.password && errors.password && (
            <p id="password-error" role="alert" className={styles.fieldError}>
              {errors.password}
            </p>
          )}
        </div>

        <button disabled={submitting} className={styles.submitButton}>
          {submitting ? "Signing in..." : "Sign In to Mesob House"}
        </button>

        <div className={styles.footer}>
          <Link to="/register">New to our dining family? Join & Register</Link>
          <Link to="/menu" className={styles.guestLink}>
            Continue as Guest
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
