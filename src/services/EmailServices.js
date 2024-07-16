import axiosInstance  from "../utility/axiosInstance";

async function verifyToken(token){
    try{
        const response = await axiosInstance({
            method: "post", 
            url: "/email/verify-email/", 
            data: {token: token}
        });

        return response.data.message;
    }
    catch(error){
        if(error.response){
            return error.response.data.message;
        }
    }
}

async function sendVerificationEmail(email){
    try{
        const response = await axiosInstance({
            method: "post", 
            url: "/email/send-verification-email/", 
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

export {
    verifyToken, 
    sendVerificationEmail
};