// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false)

  // useEffect(() => {
  //   const validationErrors = []

  // }, [credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowErrors(true)
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        console.log('data in login error', data.message)
        if (data && data.message) setErrors([data.message]);
        else setShowErrors(false)
      }
    );
  };

  return (
    <div className='login-form-modal-wrapper'>
      <div className="login-form-modal-container">
        <div className="login-form-header">
          Log in
          </div>
        <div className="login-form-content">
          <div className='login-form-welcome'>
            Welcome to Earthrnr!
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <ul className='login-error-container'>
                {errors.map((error, idx) => (
                  <div className='login-error-message' key={idx}>{error}</div>
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
                <button
                  className='login-form-submit-button'
                  type="submit"
                  onClick={() => {
                    setCredential('BobbyBobby')
                    setPassword('password')
                  }}
                >Log In as Demo User</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
