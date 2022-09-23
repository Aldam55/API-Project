// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className='login-form-modal-wrapper'>
      <div className="login-form-modal-container">
        <div className="login-form-header">Log in</div>
        <div className="login-form-content">
          <div className='login-form-welcome'>
            Welcome to EarthRnR!
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
            <div className='login-form-input'>
              <label className="login-form-text">
                Username or Email
              </label>
              <input
                className='login-input'
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>
            <div className='login-form-input'>
              <label className="login-form-text">
                Password</label>
              <input
                className='login-input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login-form-button-container">
              <div className='login-form-button'>
                <button className='login-form-submit-button' type="submit">Log In</button>
              </div>
              <div className='login-form-button'>
                <button className='login-form-submit-button' type="submit">Log In as Demo User</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
