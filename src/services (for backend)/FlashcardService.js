import axiosInstance from "../utility/axiosInstance";

async function generateFlashcard() { // isaiah to change
    
}

async function getAllFlashcardsByUser(){
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/test/getTestInfo",
            data: { email: email, testType: 'F'},
        });

        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

export {generateFlashcard, getAllFlashcardsByUser}