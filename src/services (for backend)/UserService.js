// where i define all the functions

import axiosInstance  from "../utility/axiosInstance";

async function authenticate(email, password){
    try{
        const response = await axiosInstance({
            method: "post", 
            url: "/user/authenticate/", 
            data: {email: email, password: password}
        });

        return response.data.message;
    }
    catch(error){
        if(error.response){
            return error.response.data.message;
        }
    }
}

async function createNewUser(email, password, firstName, lastName, gender){
    try{
        const response = await axiosInstance({
            method: "post",
            url: "/user/register/",
            data: {email, password, firstName, lastName, gender}
        });

        return response.data.message;
    }
    catch(error){
        if(error.response){
            return error.response.data.message;
        }
    }
}

async function getUserByEmail(email){
    try{
        const response = await axiosInstance({
            method: "get",
            url: "/user/profile/",
            data: {email: email}
        });

        return response.data.message;
    }
    catch(error){
        if(error.response){
            return error.response.data.message;
        }
    }
}

export {authenticate, createNewUser};