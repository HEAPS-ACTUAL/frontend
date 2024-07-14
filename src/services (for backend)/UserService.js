// where i define all the functions

import axiosInstance from "../utility/axiosInstance";

async function authenticate(email, password) {
  try {
    const response = await axiosInstance({
      method: "post",
      url: "/user/authenticate/",
      data: { email: email, password: password },
    });

    return response.data.message;
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    }
  }
}

async function createNewUser(email, password, firstName, lastName, gender) {
  try {
    const response = await axiosInstance({
      method: "post",
      url: "/user/register/",
      data: { email, password, firstName, lastName, gender },
    });

    return response.data.message;
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    }
  }
}

async function getUserByEmail(email) {
  try {
    const response = await axiosInstance({
      method: "post",
      url: "/user/profile/",
      data: { email: email },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.message;
    }
  }
}

async function getUserFirstName(email) {
  const userFound = await getUserByEmail(email);
  return userFound.FirstName;
}

async function getSalutation(email) {
  const userFound = await getUserByEmail(email);
  const gender = userFound.Gender;

  if (gender === "F") {
    return "Ms";
  } else {
    return "Mr";
  }
}

async function getDateJoined(email) {
    const userFound = await getUserByEmail(email);
    return userFound.DateTimeJoined;
  }

// Update User Details
async function updateUserDetails({ email, firstName, lastName }) {
  try {
    console.log("Sending user details for update:", {
      email,
      firstName,
      lastName,
    }); // Debugging log
    const response = await axiosInstance.put("/user/update/", {
      email,
      firstName,
      lastName,
    });
    return response.data.message;
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    }
  }
}

// Delete User Account
async function deleteUserAccount(email) {
  try {
    const response = await axiosInstance.delete("/user/delete/", {
      data: { email },
    });
    return response.data.message;
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    }
  }
}

async function checkUserIsVerified(email){
    try{
        const response = await axiosInstance({
            method: "post",
            url: "/user/is-verified/",
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
}

export {
  authenticate,
  createNewUser,
  getUserByEmail,
  getUserFirstName,
  getSalutation,
  updateUserDetails,
  deleteUserAccount,
  getDateJoined,
  checkUserIsVerified
};
