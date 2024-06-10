import axiosInstance  from "../utility/axiosInstance";

async function generateSampleQuestions(file){
    try{
        const response = await axiosInstance({
            method: 'post',
            url: '/quiz/generateSampleQuestions',
            data: {file: file}
        })

        console.log(response);
    }
    catch(error){
        if(error.response){
            return error.response;
        }
    }
}

export {generateSampleQuestions};