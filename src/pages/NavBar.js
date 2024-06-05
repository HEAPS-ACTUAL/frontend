import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css'; 
import quizDaddyLogo from '../images/logo.png';


function Navbar() {
  return (
    <div className={styles.navbar}>
        <Link to="/" className={styles.logoLink}>
            <img src={quizDaddyLogo} alt="quizDaddy Logo" className={styles.logo} />
            <span className={styles.logoText}>quizDaddy</span>
        </Link>

        <div className={styles.navItems}>
            <Link to="/about" className={styles.navLink}>About</Link>
            <Link to="/features" className={styles.navLink}>Features</Link>
            <Link to="/CQquizzes" className={styles.navLink}>Home</Link>
            
        </div>

        <Link to="/login" className={styles.navLinkLogin}>Log in</Link>
    </div>
  );
}

export default Navbar;
