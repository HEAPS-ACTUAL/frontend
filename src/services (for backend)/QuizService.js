import axiosInstance from "../utility/axiosInstance";

async function generateQuiz(email, quizName, difficulty, file) { // isaiah to change
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("quizName", quizName);
        formData.append("difficulty", difficulty);
        formData.append("file", file);

        const response = await axiosInstance({
            method: "post",
            url: "/quiz/generateAndStoreQuiz",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data.message;
    }
    catch (error) {
        if (error.response) {
            return error.response.data.message;
        }
    }
}

async function getToDoQuizzes(email) {
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/test/getTestInfo",
            data: { email: email, testType: 'Q', testStatus: false },
        });

        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

async function getCompletedQuizzes(email) {
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/test/getTestInfo",
            data: { email: email, testType: 'Q', testStatus: true },
        });

        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

export { generateQuiz, getToDoQuizzes, getCompletedQuizzes };
