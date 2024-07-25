import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi"; 
import styles from "../../styles/NavBar.module.css";
import quizDaddyLogo from "../../images/logo-no-background.png";

import {handleLogOut, isLoggedIn} from "../../services/ProtectionService";

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
    
    const location = useLocation();
    const formattedPathname = location.pathname.split('/')[1];

    const [currentPage, setCurrentPage] = useState(formattedPathname);

    useEffect(() => {
        setCurrentPage(formattedPathname);
    }, [formattedPathname]);

    return (
        <div className={styles.navbar}>
            <Link to="/" className={styles.logoLink}>
                <img src={quizDaddyLogo} alt="quizDaddy Logo" className={styles.logo} />
                <span className={styles.logoText}>quizDaddy</span>
            </Link>

            <div className={styles.navItems}>
                <Link to="/home" className={`${styles.navLink} ${currentPage === 'home' ? styles.currentPage : styles.notCurrentPage}`}> Home </Link>
                <Link to="/features" className={`${styles.navLink} ${currentPage === 'features' ? styles.currentPage : styles.notCurrentPage}`}> Features</Link>
            </div>

            <div className={styles.profileAndLogin}>
                {loggedIn && (
                    <Link to='/profile' title='view profile'>
                        <FiUser className={`${styles.profileIcon} ${currentPage === 'profile' ? styles.profileClicked : ''}`} />
                    </Link>
                )}

                {currentPage !== 'login' &&
                    <Link to="/login">
                        <button onClick={handleLogOut} className={styles.navLinkLogin}> {loggedIn ? "Log out" : "Log in"} </button>
                    </Link>
                }
            </div>
        </div>
    );
}

export default Navbar;
