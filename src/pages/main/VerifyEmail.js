import React, { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


// functions
import { verifyToken } from '../../services (for backend)/UserService';

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

    return (
        <div><h1>Verify Email Here TESTING IN PROGRESS</h1></div>
    );

}

export default VerifyEmail;
