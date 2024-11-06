import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import logoImg from "../assets/login/logo.png";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "../components/LoadingIndicator";
import Header from "../components/IntroHeader";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/");
    } catch (error) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-page">
      <Header />

      <div className="login-content">
        <div className="login-left">
          <div className="left-image-text">
            <p>Because your pet deserves the best!</p>
          </div>
        </div>

        <div className="login-right">
          <div className="form-logo">
            <img className="logo-top" src={logoImg} alt="Logo" />
          </div>

          {/* Implement the form directly here */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="loading-container">
              {loading && <LoadingIndicator />}
            </div>
            <button type="submit" className="login-submit">
              Login
            </button>
          </form>

          <div className="sign-up">
            New pet owner?{" "}
            <a href="/register" className="sign-up-link">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
