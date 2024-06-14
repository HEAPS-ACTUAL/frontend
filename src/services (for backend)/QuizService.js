import axiosInstance  from "../utility/axiosInstance";

async function generateQuiz(email, quizName, difficulty, file){
    try{
        const formData = new FormData();
        
        formData.append('email', email)
        formData.append('quizName', quizName)
        formData.append('difficulty', difficulty);
        formData.append('file', file[0]);
        
        const response = await axiosInstance({
            method: 'post',
            url: '/quiz/generateAndStoreQuiz',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        return response.data.message;
    }
    catch(error){
        if(error.response){
            return error.response.data.message;
        }
    }
}

async function getAllUndoneQuizzes(email){
    try{
        const response = await axiosInstance({
            method: 'post',
            url: '/quiz/getAllUndoneQuizzes',
            data: {email: email}
        })
        
        return response.data;
    }
    catch(error){
        return error.response.data.message;
    }
}

export {generateQuiz, getAllUndoneQuizzes};