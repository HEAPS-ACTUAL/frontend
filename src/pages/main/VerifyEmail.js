import React, { useState, useEffect} from 'react';
import styles from "../../styles/VerifyEmail.module.css";
import { useNavigate, useLocation } from 'react-router-dom';

// icons
import { SiTicktick } from "react-icons/si";
import { CgCloseO } from "react-icons/cg";


// functions
import { verifyToken, sendVerificationEmail } from '../../services/EmailServices';

const VerifyEmail = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    // const email = sessionStorage.getItem("userEmail");
    const [verifyOk, setVerifyOk] = useState("");
    const [email, setEmail] = useState("");
    const [sentMessage, setSentMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [cooldown, setCooldown] = useState(true);

    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token){
            handleTokenVerification(token);
        }
        else {
            console.error("Token not found")
        }

    }, [location.search]);

    useEffect(() => {

        function countDown(){
            if(cooldown <= 0){
                setIsDisabled(false);
                return;
            }
    
            setTimeout(() => {
                setCooldown(cooldown - 1);
            }, 1000);
        }

        countDown();

    }, [cooldown])

    async function handleTokenVerification(token){
        const verification = await verifyToken(token);
        setVerifyOk(verification);
        console.log(verification);
    }

    async function handleSignInButton(event){
        event.preventDefault();
        navigate('/login');
        
    }

    function handleSendEmail(event){
        event.preventDefault();

        if(email === ""){
            window.alert("Please enter a valid email address!");
        }
        else {           
            // sendVerificationEmail(email);
            alert('A verification link has been sent to the registered email!')
            // setSentMessage('A verification link has been sent to the registered email!')
            setIsDisabled(true)
            setCooldown(20)
        }
    }

    if (verifyOk === "Verification Successful!"){
        return (
            <div className={styles.container}>
                <div className={styles.tickIcon}>
                    <SiTicktick />
                </div>
                <div className={styles.greeting}>
                    Verification is Successful!
                </div>
                <button onClick={handleSignInButton}  className={styles.btnSignIn}>
                    Back to Sign In
                </button>
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <div className={styles.failIcon}>
                <CgCloseO />
            </div>
            <div className={styles.greeting}>
                Verification Failed!
            </div>
            <form onSubmit={handleSendEmail}>
                <div className={styles.inputContainer}>
                    <input type="email" placeholder="Enter Email Here" onChange={(event) => setEmail(event.target.value)}></input>
                </div>
                
                <div className={styles.buttonAndCooldown}>
                    <button disabled={isDisabled} type="submit" className={styles.btnSendEmail}>
                        Send a New Verification Email
                    </button>
                    <div className={styles.cooldown}>{cooldown > 0 && cooldown}</div>
                </div> 
            </form>
        </div>
    );

}

export default VerifyEmail;
