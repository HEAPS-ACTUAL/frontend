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
            method: "post",
            url: "/user/profile/",
            data: {email: email}
        });
        return response.data;
    }
    catch(error){
        if(error.response){
            return error.message;
        }
    }
}

async function getUserFirstName(email){
    const userFound = await getUserByEmail(email);
    return userFound.FirstName;
}

async function getSalutation(email){
    const userFound = await getUserByEmail(email);
    const gender = userFound.Gender;
    
    if(gender === "F"){
        return "Ms";
    }
    else{
       return "Mr";
    }
}

export {authenticate, createNewUser, getUserByEmail, getUserFirstName, getSalutation};