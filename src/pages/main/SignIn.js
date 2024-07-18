import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/SignIn.module.css';

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
    
    const navigate = useNavigate();

    async function handleRegistration(event) {
        event.preventDefault();

        if(email === "" || password === "" || firstName === "" || lastName === "" || gender === ""){
            window.alert("All fields must be filled in!");
        }
        else{
            if(password !== confirmPassword){
                window.alert("Passwords don't match!");
            }
            else{
            
                const returnedMessage = await createNewUser(email, password, firstName, lastName, gender);
                window.alert(returnedMessage);
                
                if(returnedMessage === "Account created! Please CHECK YOUR EMAIL to verify your account."){
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }                
            }
        }
    }

    async function handleSignIn(event){
        event.preventDefault();

        if(email === "" || password === ""){
            window.alert("All fields must be filled in!");
        }
        else{
            const returnedMessage = await authenticate (email, password);

            if (returnedMessage !== 'Authentication Successful!'){
                window.alert(returnedMessage);
            }
            else{
               handleLogIn(email);
               navigate('/home');
            }
        }    
    }

    const [isActive, setIsActive] = useState(false);

    return (
        <>
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
                </form>
            </div>
            <div className={`${styles.formContainer} ${styles.signIn}`}>
                <form onSubmit={handleSignIn}>
                    <h1>Sign In</h1>
                    <br></br>
                    <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className={styles.toggleContainer}>
                <div className={styles.toggle}>
                    <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                        <h1>Welcome Back!</h1>
                        <button className={styles.hidden} id="login" onClick={() => setIsActive(false)}>Sign In</button>
                    </div>
                    <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
                        <h1>Don't have an account?</h1>
                        <button className={styles.hidden} id="register" onClick={() => setIsActive(true)}>Register Here</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default SignIn;
