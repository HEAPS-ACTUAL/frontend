import axiosInstance from "../utility/axiosInstance";

async function deleteTest(email, testID, testName) { // isaiah to change
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/test/deleteTest",
            data: { email, testID, testName },
        });
    
        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

export {deleteTest};