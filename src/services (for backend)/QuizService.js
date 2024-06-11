import axiosInstance  from "../utility/axiosInstance";

async function generateSampleQuestions(file){
    try{
        console.log(file);
        const formData = new FormData();

        for(let i = 0; i < file.length; i += 1){
            formData.append('file', file[i]);
        }
        
        // console.log(formData);
        
        const response = await axiosInstance({
            method: 'post',
            url: '/file/upload',
            // url: '/quiz/generateSampleQuestions',
            body: formData
        })

        // console.log(response);
    }
    catch(error){
        if(error.response){
            return error.response;
        }
    }
}

export {generateSampleQuestions};