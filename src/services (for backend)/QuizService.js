import axiosInstance  from "../utility/axiosInstance";

async function generateSampleQuestions(file){
    try{
        const formData = new FormData();
        formData.append('file', file[0]);
        console.log(formData);
        
        const response = await axiosInstance({
            method: 'post',
            url: '/file/upload',
            // url: '/quiz/generateSampleQuestions',
            body: formData
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