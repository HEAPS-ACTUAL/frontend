import React, { useState } from 'react';
import './SignIn.css';  // Make sure to create this CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your sign-in logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>

          <div className="input-container">
            <i className="fa fa-envelope-o" aria-hidden="true"></i>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-field"
            />
          </div>
          <div className="input-container">
            <i class="fa fa-key" aria-hidden="true"></i>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input-field"
            />
          </div>
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me for 30 days
            </label>
            <a href="#" className="link">Forgot password?</a>
          </div>
          <button type="submit" className="signin-button">Sign in</button>
          <div className="signup-container">
            Don't have an account? <a href="#" className="link">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;