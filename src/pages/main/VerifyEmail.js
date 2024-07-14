import React, { useState, useEffect} from 'react';
import styles from "../../styles/VerifyEmail.module.css";
import { useNavigate, useLocation } from 'react-router-dom';

// icons
import { SiTicktick } from "react-icons/si";
import { CgCloseO } from "react-icons/cg";


// functions
import { verifyToken, sendVerificationEmail } from '../../services (for backend)/EmailServices';

const VerifyEmail = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    // const email = sessionStorage.getItem("userEmail");
    const [verifyOk, setVerifyOk] = useState("");
    const [JWToken, setJWT] = useState("");
    const [email, setEmail] = useState("");


    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        setJWT(token);
        if (token){
            handleTokenVerification(token);
        }else{
            console.error("Token not found")
        }
    }, [location]);

    async function handleTokenVerification(token){
        const verification = await verifyToken(token);
        setVerifyOk(verification);
        console.log(verifyOk);
    }

    async function handleSignInButton(){
        navigate('/login');
    }

    async function handleSendEmail(){
        sendVerificationEmail(email);
    }

    // if verifyToken response == "Verified Successfully"
    // messageText = "Verification was successful. BUTTON to sign in page"

    //else
    // messageText = "Verification was unsuccessful. Button to send verification email"

    if (verifyOk == "Verification Successful!"){
        return (
            <div className={styles.container}>
                <div className={styles.tickIcon}>
                    <SiTicktick />
                </div>
                <div className={styles.greeting}>
                    Verification was Successful!
                </div>
                <div className={styles.buttonsContainer}>
                <button onClick={handleSignInButton}  className={styles.btnSignIn}>
                    Back to Sign In
                </button>
                </div>    
            </div>
        );
    }
    if (verifyOk == "Verification Failed!"){
        return (
            <div className={styles.container}>
                <div className={styles.failIcon}>
                    <CgCloseO />
                </div>
                <div className={styles.greeting}>
                    Verification Failed!
                </div>
                <form onSubmit={handleSendEmail}>
                <input type="email" placeholder="Enter Email Here" onChange={(event) => setEmail(event.target.value)}></input>

                </form>
                <div className={styles.buttonsContainer}>
                <button type="submit" className={styles.btnSendEmail}>
                    Send a New Verification Email
                </button>

                </div>    
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.greeting}>
            
            <h1>Loading...</h1>
            </div>
        </div>
    );

}

export default VerifyEmail;
