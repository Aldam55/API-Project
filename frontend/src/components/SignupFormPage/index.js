// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (!image.match(/\.(jpg|jpeg|png|gif)$/)) errors.push('Please enter a valid image.')


  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-form-wrapper">
      <div className="signup-form-container">
        <div className="signup-form-header">
          Sign Up
        </div>
        <div className='signup-form-content'>
          <div className="signup-form-welcome">
            Welcome to Earthrnr!
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
            </div>
            <div className="signup-form-input">
              <label className="signup-form-text">
                First Name</label>
              <input
                className="signup-input"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-input">
              <label className="signup-form-text">
                Last Name</label>
              <input
                className="signup-input"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-input">
              <label className="signup-form-text">
                Email</label>
              <input
                className="signup-input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-input">
              <label className="signup-form-text">
                Username</label>
              <input
                className="signup-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-input">
              <label className="signup-form-text">
                Password</label>
              <input
                className="signup-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-input">
              <label className="signup-form-text">
                Confirm Password</label>
              <input
                className="signup-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className='signup-form-button-container'>
              <div className="signup-form-button">
                <button
                  type="submit"
                  className="signup-form-submit-button"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
