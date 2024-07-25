import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/SignIn.module.css';

// Components
import AccountCreatedModal from './AccountCreatedModal';

// functions
import { authenticate, createNewUser } from '../../services/UserService';
import { handleLogIn } from '../../services/ProtectionService';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');

    const [registrationMessage, setRegistrationMessage] = useState('');
    const [signInMessage, setSignInMessage] = useState('');
    const [showAccountCreatedModal, setShowAccountCreatedModal] = useState(false);
    
    const navigate = useNavigate();

    async function handleRegistration(event) {
        event.preventDefault();

        if(email === "" || password === "" || firstName === "" || lastName === "" || gender === ""){
            setRegistrationMessage("All fields must be filled in!");
        }
        else{
            if(password !== confirmPassword){
                setRegistrationMessage("Passwords don't match!");
            }
            else{
                const returnedMessage = await createNewUser(email, password, firstName, lastName, gender);
                
                if(returnedMessage === "Email already exists!"){
                    setRegistrationMessage(returnedMessage);
                }
                else{
                    setRegistrationMessage('');
                    setShowAccountCreatedModal(true);
                }
            }
        }
    }

    async function handleSignIn(event){
        event.preventDefault();

        if(email === "" || password === ""){
            setSignInMessage("All fields must be filled in!");
        }
        else{
            const returnedMessage = await authenticate (email, password);

            if (returnedMessage !== 'Authentication Successful!'){
                setSignInMessage(returnedMessage);
            }
            else{
               handleLogIn(email);
               navigate('/home');
            }
        }    
    }

    const [isActive, setIsActive] = useState(false);

    function showSignIn(){
        setIsActive(false);
        setSignInMessage('');
    }
    
    function showRegistration(){
        setIsActive(true);
        setRegistrationMessage('');
    }

    return (
        <div>
            <div className={`${styles.container} ${isActive ? styles.active : ''}`} id="container">
                <div className={`${styles.formContainer} ${styles.signUp}`}>
                    <form onSubmit={handleRegistration}>
                        <h1>Create Account</h1>
                        <br></br>
                        <div>
                            <input className={styles.firstName} type="text" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)} />
                            <input className={styles.lastName} type="text" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)} />
                        </div>
                        <select name="gender" onChange={(event) => setGender(event.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                        <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
                        <div>
                            <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                            <input type="password" placeholder="Confirm Password" onChange={(event) => setConfirmPassword(event.target.value)}/>
                        </div>
                        <button type="submit">Register</button>

                        <p>{registrationMessage && registrationMessage}</p>
                    </form>


                </div>
                <div className={`${styles.formContainer} ${styles.signIn}`}>
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <br></br>
                        <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                        <button type="submit">Sign In</button>

                        <p>{signInMessage && signInMessage}</p>
                    </form>

                </div>
                <div className={styles.toggleContainer}>
                    <div className={styles.toggle}>
                        <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                            <h1>Welcome Back!</h1>
                            <button className={styles.hidden} id="login" onClick={showSignIn}>Sign In</button>
                        </div>
                        <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
                            <h1>Don't have an account?</h1>
                            <button className={styles.hidden} id="register" onClick={showRegistration}>Register Here</button>
                        </div>
                    </div>
                </div>
            </div>

            {showAccountCreatedModal && <AccountCreatedModal />}
        </div>
    );
}

export default SignIn;
