import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-page">
      <div className="top-navigation-bar">
        <div className="top-navigation-bar-child"></div>
        <a href="#our-mission" className="nav-button"><div className="our-mission">Our mission</div></a>
        <a href="#team" className="nav-button"><div className="team">Team</div></a>
        <a href="#services" className="nav-button"><div className="services">Services</div></a>
        <a href="#login" className="nav-button"><div className="login1">Login</div></a>
        <button className="schedule-now-btn">Schedule Now</button>
        <a href="#landing-page"><img className="care-less-whisker-high-resolut-icon" alt="Logo" src="src/images/logo.png" /></a>
        <img className="care-less-whisker-high-resolut-icon1" alt="Logo" src="src/images/logo.png" />
      </div>

      <div className="left">
        <img className="petgilid-1-icon" alt="Pet Care" src="src/images/Petgilid.png" />
        <div className="our-services">
          <p className="our-services1">Our services:</p>
          <ul className="surgeries1">
            <li>Surgeries</li>
            <li>Wellness Check-up</li>
            <li>Vaccinations</li>
            <li>Grooming</li>
          </ul>
        </div>
        <div className="pet-care-services">Pet Care Services</div>
        <div className="we-care-about">We Care About Your Pet</div>
      </div>

      <div className="right">
        <b className="user-login">{name}</b>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="on"
          />
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="on"
          />
          {loading && <LoadingIndicator />}
          <button className="login-btn" type="submit">{name}</button>
        </form>
        <a href="#forgot-password" className="forms-button">
          <div className="forgot-password">Forgot password?</div>
        </a>
        <a href="#create-new-account" className="forms-button">
          <div className="create-new-account">Create new account?</div>
        </a>
      </div>
    </div>
  );
}

export default Form;
