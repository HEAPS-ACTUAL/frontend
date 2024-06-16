import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/SignIn.css';

// functions
import { authenticate, createNewUser } from '../../services (for backend)/UserService';
import { handleLogIn } from '../../services (for backend)/ProtectionService';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [signInMessage, setSignInMessage] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    
    const navigate = useNavigate();

    async function handleRegistration(event) {
        event.preventDefault();
        setSignInMessage("");

        if(email === "" || password === "" || firstName === "" || lastName === "" || gender === ""){
            setRegisterMessage("All fields must be filled in!");
        }
        else{
            if(password !== confirmPassword){
                setRegisterMessage("Passwords don't match!");
            }
            else{
                const returnedMessage = await createNewUser(email, password, firstName, lastName, gender);
                setRegisterMessage(returnedMessage);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
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
            setSignInMessage(returnedMessage);

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

    return (
        <>
        <div className={isActive ? "container active" : "container"} id="container">
            <div className="form-container sign-up">
                <form onSubmit={handleRegistration}>
                    <h1>Create Account</h1>
                    <br></br>
                    <div>
                        <input className="firstName" type="text" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)} />
                        <input className="lastName" type="text" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)} />
                    </div>
                    <select name="gender" onChange={(event) => setGender(event.target.value)}>
                        <option value="">Select Gender</option> 
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="other">Other</option>
                    </select> 
                    <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
                    <div>
                        <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                        <input type="password" placeholder="Confirm Password" onChange={(event) => setConfirmPassword(event.target.value)}/>
                    </div>
                    <button type="submit">Register</button>
                    {registerMessage && <p> {registerMessage} </p>}
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={handleSignIn}>
                    <h1>Sign In</h1>
                    <br></br>
                    <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                    <button type="submit">Sign In</button>
                    {signInMessage && <p> {signInMessage} </p>}
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        {/* <p>Enter your personal details to use all of site features</p> */}
                        <button className="hidden" id="login" onClick={() => setIsActive(false)}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Don't have an account?</h1>
                        {/* <p>Enter your personal details to start your learning</p> */}
                        <button className="hidden" id="register" onClick={() => setIsActive(true)}>Register Here</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default SignIn;
