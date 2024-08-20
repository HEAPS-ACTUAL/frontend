import axiosInstance from "../utility/axiosInstance";

async function authenticate(email, password) {
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/user/authenticate",
            data: { email: email, password: password }
        });

        return response.data.message;
    } 
    catch (error) {
        if (error.response) {
            return error.response.data.message;
        }
    }
}

async function createNewUser(email, password, firstName, lastName, gender, accessCode) {
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/user/register/",
            data: { email, password, firstName, lastName, gender, accessCode }
        });

        return response.data.message;
    } 
    catch (error) {
        if (error.response) {
            return error.response.data.message;
        }
    }
}

async function getUserByEmail(email) {
    try {
        const response = await axiosInstance({
            method: "get",
            url: "/user/profile",
            params: { email: email },
        });
        
        return response.data;
    } 
    catch (error) {
        if (error.response) {
            return error.message;
        }
    }
}

async function getUserFirstName(email) {
    const userFound = await getUserByEmail(email);
    return userFound.FirstName;
}

async function getUserVerificationStatus(email){
    const userFound = await getUserByEmail(email);
    return userFound.IsVerified;
}

// Update User Details
async function updateUserDetails(email, firstName, lastName, hashedPassword = null, inputPassword = null, newPassword = null) {
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/user/update/",
            data: { email, firstName, lastName, hashedPassword, inputPassword, newPassword }
        });

        return response.data.message;
    }
    catch (error) {
        if (error.response) {
            return error.response.data.message;
        }
    }
}

// Delete User Account
async function deleteUserAccount(email) {
    try {
        const response = await axiosInstance({
            method: "delete",
            url: "/user/delete/",
            data: { email },
        });

        return response.data.message;
    } 
    catch (error) {
        if (error.response) {
            return error.response.data.message;
        }
    }
}

export {authenticate, createNewUser, getUserByEmail, getUserFirstName, updateUserDetails, deleteUserAccount, getUserVerificationStatus};
