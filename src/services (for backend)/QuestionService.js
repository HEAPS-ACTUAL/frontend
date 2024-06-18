import axiosInstance  from "../utility/axiosInstance";

async function getNumberOfQuestions(email, quizID){
    try{
        const response = await axiosInstance({
            method: 'post',
            url: '/question/getNumberOfQuestions',
            data: {email: email, quizID: quizID}
        })
        
        return response.data;
    }
    catch(error){
        return error.response.data.message;
    }
}

async function getAllQuestionsAndOptionsFromAQuiz(email, quizID){
    try{
        const response = await axiosInstance({
            method: 'post',
            url: '/question/getQuestionsAndOptions',
            data: {email: email, quizID: quizID}
        })
        
        // console.log(response.data);
        return response.data;
    }
    catch(error){
        return error.response.data.message;
    }
}

export {getNumberOfQuestions, getAllQuestionsAndOptionsFromAQuiz}; 