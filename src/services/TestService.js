import axiosInstance from "../utility/axiosInstance";

async function deleteTest(testID, testName) {
    try {
        const response = await axiosInstance({
            method: "delete",
            url: "/test/deleteTest",
            data: {testID, testName},
        });
    
        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

async function getAllQuestionsAndOptionsFromATest(testID){
    try{
        const response = await axiosInstance({
            method: 'get',
            url: '/test/getQuestionsAndOptions',
            params: {testID: testID}
        })
        
        // console.log(response.data);
        return response.data;
    }
    catch(error){
        return error.response.data.message;
    }
}

async function getTestName(testID){
    try {
        const response = await axiosInstance({
            method: "get",
            url: "/test/getTestNameById",
            params: {testID: testID}
        });

        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response.data.message;
        }
    }
}


export {deleteTest, getAllQuestionsAndOptionsFromATest, getTestName};