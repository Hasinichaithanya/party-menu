import { useState, type SubmitEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LocalStorageKeys } from "../../constants/constants";
import type { ILoginResponse } from "../../interfaces/LoginResponse";
import "./Login.css";

function Login() {
  const locate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await fetch(
        " https://serverless-api-teal.vercel.app/api/auth/signin",
        {
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      const response: ILoginResponse = await result.json();
      console.log("Response:", response);
      localStorage.setItem(LocalStorageKeys.TOKEN, response.data.token);
      localStorage.setItem(
        LocalStorageKeys.USER_DETAILS,
        JSON.stringify(response.data.user)
      );
      // Navigate({ to: "/" });
      locate("/");
    } catch (error) {
      console.error("Error during fetch:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const isLoggedIn = localStorage.getItem(LocalStorageKeys.TOKEN) !== null;

  if (isLoggedIn) {
    return Navigate({ to: "/" });
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <span className="login-icon" aria-hidden="true">
            &#127869;
          </span>
          <h3 className="heading">Party Menu</h3>
          <p className="description">Sign in to explore our delicious menu!</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-item">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
        <p className="error-message">
          {error && <span className="error">{error}</span>}
        </p>
      </div>
    </div>
  );
}

export default Login;
