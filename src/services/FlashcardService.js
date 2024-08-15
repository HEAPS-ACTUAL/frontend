import axiosInstance from "../utility/axiosInstance";

async function generateFlashcard(email, testName, testType, file) {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("testName", testName);
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

async function getAllFlashcardsByUser(email) {
    try {
        const response = await axiosInstance({
            method: "get",
            url: "/test/getTestInfo",
            params: { email: email, testType: 'F' },
        });

        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

async function getAllFlashcardsWithoutSchedule(email) {
    try {
        const response = await axiosInstance({
            method: "get",
            url: "/flashcard/getAllFlashcardsWithoutSchedule",
            params: { email: email }
        });

        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

async function getFlashcardsByScheduleID(scheduleID){
    try {
        const response = await axiosInstance({
            method: "get",
            url: "/flashcard/getFlashcardsByScheduleID",
            params: { scheduleID: scheduleID }
        });

        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

async function updateFlashcard(testID, updatedText, questionNo, isBack){
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/flashcard/updateFlashcard",
            data: {testID: testID, updatedText: updatedText, questionNo: questionNo, isBack: isBack}
        });

        return response.data.message;
    }
    catch (error) {
        if (error.response) {
            return error.response.data.message;
        }
    }
}

export { generateFlashcard, getAllFlashcardsByUser, getAllFlashcardsWithoutSchedule, getFlashcardsByScheduleID, updateFlashcard };