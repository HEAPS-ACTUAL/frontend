import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; 
import quizDaddyLogo from '../images/logo.png';


function Navbar() {
  return (
    <div className="navbar">
        <Link to="/" className="logo-link">
            <img src={quizDaddyLogo} alt="quizDaddy Logo" className="logo" />
            <span className="logo-text">quizDaddy</span>
        </Link>

        <div className="nav-items">
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/CQSideBar" className="nav-link">Create Quizzes</Link>
            <Link to="/features" className="nav-link">Features</Link>
        </div>

        <Link to="/login" className="nav-link-login">Log in</Link>
    </div>
  );
}

export default Navbar;
