import React, { useState, useEffect} from 'react';
import styles from "../../styles/VerifyEmail.module.css";
import { useNavigate, useLocation } from 'react-router-dom';


// functions
import { verifyToken } from '../../services (for backend)/EmailServices';

const VerifyEmail = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    // const email = sessionStorage.getItem("userEmail");

    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token){
            verifyToken(token);
        }else{
            console.error("Token not found")
        }
    }, [location]);

    // if verifyToken response == "Verified Successfully"
    // messageText = "Verification was successful. BUTTON to sign in page"

    //else
    // messageText = "Verification was unsuccessful. Button to send verification email"

    return (
        <div className={styles.container}>
            <div className={styles.greeting}><h1>Verify Email Here TESTING IN PROGRESS</h1>
            </div>
        </div>
    );

}

export default VerifyEmail;
