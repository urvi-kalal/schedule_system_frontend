import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { REGISTER_MUTATION } from "./auth.mutations";
import { ROUTES } from "../../constants";
import styles from "./Auth.module.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: () => {
      navigate(ROUTES.LOGIN);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ variables: form });
  };

  return (
    <AuthLayout>
      <div className={styles.header}>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Start scheduling in minutes</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="form-group">
          <label className="form-label" htmlFor="reg-name">Full name</label>
          <input
            id="reg-name"
            className="form-input"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            className="form-input"
            type="email"
            name="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reg-password">Password</label>
          <input
            id="reg-password"
            className="form-input"
            type="password"
            name="password"
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error-msg">⚠ {error}</p>}

        <button
          id="register-submit"
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", marginTop: "0.5rem" }}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className={styles.footer}>
        Already have an account?{" "}
        <Link to={ROUTES.LOGIN}>Sign in</Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
