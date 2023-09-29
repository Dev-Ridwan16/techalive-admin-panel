import React, { useState } from "react";

// Style
import "../Style/Account.css";
import { Link, Route, Router, Routes } from "react-router-dom";

export const AccountForm = () => {
  const [isToggle, setIsToggle] = useState(true);

  const handleIsToggle = () => {
    setIsToggle(!isToggle);
  };
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <SignupComp
              isToggle={isToggle}
              handleIsToggle={handleIsToggle}
            />
          }
        />
        <Route
          path="login"
          element={
            <LoginComp
              isToggle={isToggle}
              handleIsToggle={handleIsToggle}
            />
          }
        />
      </Routes>
    </div>
  );
};

export const SignupComp = ({ isToggle, handleIsToggle }) => {
  return (
    <div className="acc-container">
      <div className="brand">
        <img
          src="https://i.imgur.com/UKGl5Qk.png"
          alt=""
        />
        <h1>Techalive</h1>
      </div>
      <div className="form">
        <h1>Create account</h1>
        <p>Signup as an admin</p>
        <form action="">
          <input
            type="name"
            placeholder="Full name"
          />
          <input
            type="email"
            placeholder="Email address"
          />
          <input
            type="tel"
            placeholder="Phone number"
          />
          <div className="password">
            <input
              type={isToggle ? "password" : "text"}
              placeholder="Create password"
            />
            <div
              className="showToggle"
              onClick={handleIsToggle}
            >
              {isToggle ? (
                <i className="pi pi-eye"></i>
              ) : (
                <i className="pi pi-eye-slash"></i>
              )}
            </div>
          </div>
          <button type="submit">Create account</button>
        </form>
        <div className="foot">
          <div>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoginComp = ({ isToggle, handleIsToggle }) => {
  return (
    <div className="acc-container">
      <div className="brand">
        <img
          src="https://i.imgur.com/UKGl5Qk.png"
          alt=""
        />
        <h1>Techalive</h1>
      </div>
      <div className="form">
        <h1>Login your account</h1>
        <form>
          <input
            type="email"
            placeholder="Email address"
          />
          <div className="password">
            <input
              type={isToggle ? "password" : "text"}
              placeholder="Your password"
            />
            <div
              className="showToggle"
              onClick={handleIsToggle}
            >
              {isToggle ? (
                <i className="pi pi-eye"></i>
              ) : (
                <i className="pi pi-eye-slash"></i>
              )}
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="foot">
          <div>
            <Link to={"/signup"}>Signup</Link>
          </div>
          <p>Forgot password</p>
        </div>
      </div>
    </div>
  );
};
