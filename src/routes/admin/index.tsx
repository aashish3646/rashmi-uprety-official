import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, useEffect } from "react";
import { adminLogin, isAdminAuthenticated } from "@/lib/admin";

export const Route = createFileRoute("/admin/")({
  component: AdminLogin,
});

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAdminAuthenticated()) {
      void navigate({ to: "/admin/dashboard" });
    }
  }, [navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    const ok = adminLogin(password);
    if (ok) {
      void navigate({ to: "/admin/dashboard" });
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  return (
    <div className="admin-root">
      <div className="admin-login-wrap">
        {/* Logo mark */}
        <div className="admin-logo">
          <span className="admin-logo-initials">RU</span>
        </div>

        <h1 className="admin-login-title">Admin Portal</h1>
        <p className="admin-login-sub">Rashmi Uprety · Official Portfolio</p>

        <form
          className={`admin-login-form${shaking ? " shake" : ""}`}
          onSubmit={handleSubmit}
        >
          <label className="admin-label" htmlFor="admin-password">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            className={`admin-input${error ? " admin-input-error" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            autoComplete="current-password"
            required
          />
          {error && (
            <p className="admin-error-msg" role="alert">
              Incorrect password. Please try again.
            </p>
          )}
          <button type="submit" className="admin-btn-primary">
            Sign in →
          </button>
        </form>

        <p className="admin-footer-note">
          This area is restricted to authorised personnel only.
        </p>
      </div>

      <style>{`
        .admin-root {
          min-height: 100vh;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', system-ui, sans-serif;
          padding: 1.5rem;
        }
        .admin-login-wrap {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .admin-logo {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a96e 0%, #e8c99a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .admin-logo-initials {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0a0a0a;
          letter-spacing: 0.05em;
        }
        .admin-login-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 0.35rem;
          letter-spacing: -0.02em;
        }
        .admin-login-sub {
          font-size: 0.8rem;
          color: #666;
          margin: 0 0 2.5rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .admin-login-form {
          width: 100%;
          background: #141414;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .admin-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #888;
        }
        .admin-input {
          background: #0a0a0a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: #f5f5f5;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .admin-input:focus {
          border-color: #c9a96e;
        }
        .admin-input-error {
          border-color: #ef4444 !important;
        }
        .admin-error-msg {
          font-size: 0.78rem;
          color: #ef4444;
          margin: 0;
        }
        .admin-btn-primary {
          margin-top: 0.5rem;
          background: linear-gradient(135deg, #c9a96e 0%, #e8c99a 100%);
          color: #0a0a0a;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          border: none;
          border-radius: 8px;
          padding: 0.85rem 1rem;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        .admin-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .admin-btn-primary:active { transform: translateY(0); }
        .admin-footer-note {
          margin-top: 2rem;
          font-size: 0.72rem;
          color: #444;
          text-align: center;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .shake { animation: shake 0.55s ease; }
      `}</style>
    </div>
  );
}
