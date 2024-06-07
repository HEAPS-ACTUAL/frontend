
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/SignIn.css'; 
import { authenticate, createNewUser } from '../../services (for backend)/UserService';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();

    async function handleRegistration(event) {
        event.preventDefault();
        const returnedMessage = await createNewUser(email, password, firstName, lastName, gender);
        console.log(returnedMessage);
        setMessage(returnedMessage);
    }

    async function handleSignIn(event){
        event.preventDefault();
        const returnedMessage = await authenticate (email, password);
        setMessage(returnedMessage);

        if (returnedMessage !== 'Authentication Successful!'){
            setMessage(returnedMessage);
        }
        else{
            navigate('/CQquizzes');
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
                    <input type="text" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)} />
                    <input type="text" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)} />
                    <select name="gender" onChange={(event) => setGender(event.target.value)}>
                        <option>Select Gender</option> 
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="other">Other</option>
                    </select>      
                    <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                    <button type="submit">Sign up</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={handleSignIn}>
                    <h1>Sign In</h1>
                    <br></br>
                    <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                    <a>Forget Your Password?</a> 
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className="hidden" id="login" onClick={() => setIsActive(false)}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className="hidden" id="register" onClick={() => setIsActive(true)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        <h1>{message}</h1>
        </>
    );
}

export default SignIn;
