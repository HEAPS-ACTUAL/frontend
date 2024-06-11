import axiosInstance  from "../utility/axiosInstance";

async function generateQuiz(file){
    try{
        // console.log(file);
        const formData = new FormData();
        formData.append('file', file[0]);
        
        const response = await axiosInstance({
            method: 'post',
            // url: '/file/upload',
            url: '/quiz/generateSampleQuestions',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        console.log(response.data.questions);
    }
    catch(error){
        if(error.response){
            return error.response;
        }
    }
}

export {generateQuiz};