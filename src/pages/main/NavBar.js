import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from '../../styles/NavBar.module.css';
import quizDaddyLogo from '../../images/logo-no-background.png';

import { handleLogOut, isLoggedIn } from '../../services (for backend)/ProtectionService';

function Navbar() {
    const [logInOutButton, setLogInOutButton] = useState('');

    function updateLogInStatus() {
        if (isLoggedIn()) {
            setLogInOutButton('Log out');
        }
        else {
            setLogInOutButton('Log in');
        }
    }

    useEffect(() => {
        updateLogInStatus();
        window.addEventListener('logInOut', updateLogInStatus);
    })

    return (
        <div className={styles.navbar}>
            <Link to="/" className={styles.logoLink}>
                <img src={quizDaddyLogo} alt="quizDaddy Logo" className={styles.logo} />
                <span className={styles.logoText}>quizDaddy</span>
            </Link>

            <div className={styles.navItems}>

                <Link to="/" className={styles.navLink}>About</Link>
                <Link to="/features" className={styles.navLink}>Features</Link>
                <Link to="/Home" className={styles.navLink}>Home</Link>
        
           
            </div>

            <Link to="/login" className={styles.navLinkLogin}><button onClick={handleLogOut}>{logInOutButton}</button></Link>
        </div>
    );
}

export default Navbar;

