import React, { useState } from 'react';
import { createNewUser } from '../services/UserService';

function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');
    
    function handleGender(event){
        setGender(event.target.value);
    }

    async function Register(event){
        event.preventDefault();
        const returnedMessage = await createNewUser(email, password, firstName, lastName, gender);
        setMessage(returnedMessage);
    }

    return (
        <div>
            <form onSubmit={Register}>
                Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
                <br></br>

                Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/> 
                <br></br>
                
                First Name: <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}/> 
                <br></br>
                
                Last Name: <input type='text' value={lastName} onChange={(e) => setLastname(e.target.value)}/> 
                <br></br>
                <br></br>
                
                Gender: 
                <label> Male <input type='radio' name='gender' value="M" onChange={handleGender}/> </label>
                <label> Female <input type='radio' name='gender' value="F" onChange={handleGender}/> </label>
                <br></br>

                <input type='submit' value="Register"/>
            </form>

            {message && <p> {message} </p>}

        </div>
    );
}

export default Register;