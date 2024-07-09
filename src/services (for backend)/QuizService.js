import axiosInstance from "../utility/axiosInstance";

async function generateQuiz(email, testName, testType, difficulty, file) { // isaiah to change
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("testName", testName);
        formData.append("difficulty", difficulty);
        formData.append("testType", testType);
        formData.append("file", file);

        const response = await axiosInstance({
            method: "post",
            url: "/test/generateAndStoreTest",
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

async function getAllQuestionsAndOptionsFromAQuiz(testID){
    try{
        const response = await axiosInstance({
            method: 'post',
            url: '/test/getQuestionsAndOptions',
            data: {testID: testID}
        })
        
        // console.log(response.data);
        return response.data;
    }
    catch(error){
        return error.response.data.message;
    }
}

async function markQuizAsDone(testID){
    try{
        const response = await axiosInstance({
            method: 'post',
            url: '/quiz/markQuizAsDone',
            data: {testID: testID}
        })
        
        // console.log(response.data);
        return response.data;
    }
    catch(error){
        return error.response.data.message;
    }
}

async function storeUserQuizAnswers(testID, userAnswers){
    try{
        const response = await axiosInstance({
            method: 'post',
            url: '/quiz/storeUserQuizAnswers',
            data: {testID: testID, userAnswers: userAnswers}
        })
        
        return response.data;
    }
    catch(error){
        return error.response.data.message;
    }
}

async function reviewQuiz(testID, attemptNo){
    try{
        const response = await axiosInstance({
            method: 'post',
            url: '/quiz/reviewQuiz',
            data: {testID: testID, attemptNo: attemptNo}
        })

        return response.data[0];
    }
    catch(error){
        return error.response.data.message;
    }
}

export { 
    generateQuiz, 
    getToDoQuizzes, 
    getCompletedQuizzes, 
    getAllQuestionsAndOptionsFromAQuiz, 
    markQuizAsDone,
    storeUserQuizAnswers,
    reviewQuiz
};