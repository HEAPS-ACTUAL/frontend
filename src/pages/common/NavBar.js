import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/NavBar.module.css'; 
import quizDaddyLogo from '../../images/logo.png';


function Navbar() {

  function handleLogOut(){
    sessionStorage.clear();
  }

  // IGNORE THESE CODES FIRST, IM TRYING TO MAKE THE LOG IN CHANGE TO LOG OUT
  // WHEN USER SUCCESSFULLY LOGS IN

  const [logInOut, setLogInOut] = useState('');

  function updateLogInStatus(){
    if(sessionStorage.getItem('userEmail')){
      setLogInOut('Log out');
    }
    else{
      setLogInOut('Log in');
    }
  }

  useEffect(() => {
    updateLogInStatus();
    // window.addEventListener('storage', updateLogInStatus);
    // return () => {
    //   window.removeEventListener('storage', updateLogInStatus);
    // }
  }, [])

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
            <Link to="/flashcard" className={styles.navLink}>flashcard(temp)</Link>
        </div>

        <Link to="/login" className={styles.navLinkLogin}><button onClick={handleLogOut}>{logInOut}</button></Link>
    </div>
  );
}

export default Navbar;
