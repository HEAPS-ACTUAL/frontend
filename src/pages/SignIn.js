import React, { useState } from 'react';
import '../styles/SignIn.css';  // Make sure to create this CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { authenticate } from '../services/UserService';
import { Link } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(password);
    const returnedMessage = await authenticate(email, password);
    setMessage(returnedMessage);
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
            Don't have an account? 
            <Link to="/register"> <a href="#" className="link"> Register here </a> </Link>
          </div>
        </form>
        {message && <p> {message} </p>}
      </div>
    </div>
  );
}

export default SignIn;

// import React from 'react';
// import Swal from 'sweetalert2';

// function LoginForm() {
//   const handleLogin = () => {
//     let usernameInput;
//     let passwordInput;

//     Swal.fire({
//       title: 'Login Form',
//       html: (
//         <>
//           <input type="text" id="username" className="swal2-input" placeholder="Username" />
//           <input type="password" id="password" className="swal2-input" placeholder="Password" />
//         </>
//       ),
//       confirmButtonText: 'Sign in',
//       focusConfirm: false,
//       didOpen: () => {
//         const popup = Swal.getPopup();
//         usernameInput = popup.querySelector('#username');
//         passwordInput = popup.querySelector('#password');

//         usernameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
//         passwordInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
//       },
//       preConfirm: () => {
//         const username = usernameInput.value;
//         const password = passwordInput.value;
//         if (!username || !password) {
//           Swal.showValidationMessage('Please enter username and password');
//         }
//         return { username, password };
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const { username, password } = result.value;
//         console.log('Username:', username, 'Password:', password);
//         // Handle the login logic here
//       }
//     });
//   };

//   // return (
//   //   <div>
//   //     <button onClick={handleLogin}>Login</button>
//   //   </div>
//   // );
// }

// export default LoginForm;
