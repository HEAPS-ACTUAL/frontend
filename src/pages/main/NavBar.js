import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi"; // Import user icon from react-icons

import styles from "../../styles/NavBar.module.css";
import quizDaddyLogo from "../../images/logo-no-background.png";

import {
  handleLogOut,
  isLoggedIn,
} from "../../services (for backend)/ProtectionService";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const updateLogInStatus = () => setLoggedIn(isLoggedIn());
    updateLogInStatus();
    window.addEventListener("logInOut", updateLogInStatus);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("logInOut", updateLogInStatus);
    };
  }, []);

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logoLink}>
        <img src={quizDaddyLogo} alt="quizDaddy Logo" className={styles.logo} />
        <span className={styles.logoText}>quizDaddy</span>
      </Link>

      <div className={styles.navItems}>
        <Link to="/home" className={styles.navLink}>
          Home
        </Link>
        <Link to="/features" className={styles.navLink}>
          Features
        </Link>
      </div>

      <div className={styles.navLinkLogin}>
        {loggedIn && (
          <FiUser
            className={styles.profileIcon}
            onClick={() => (window.location.href = "/home/profile")} // Navigate to profile page on click
          />
        )}
        <Link to="/login">
          <button onClick={handleLogOut} className={styles.navLinkLogin}>
            {loggedIn ? "Log out" : "Log in"}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
