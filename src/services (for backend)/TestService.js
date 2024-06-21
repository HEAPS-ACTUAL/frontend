import axiosInstance from "../utility/axiosInstance";

async function deleteTest(email, quizID, quizName) { // isaiah to change
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/deleteQuiz",
            data: { email, quizID, quizName },
        });
    
        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

export {deleteTest};