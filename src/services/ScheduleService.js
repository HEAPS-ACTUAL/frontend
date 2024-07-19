import axiosInstance from "../utility/axiosInstance";

async function retrieveAllRevisionDates(email) {
    try {
        const response = await axiosInstance({
            method: "get",
            url: "/schedule/retrieveAllRevisionDates",
            params: { email: email }
        });
        
        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

// once i click generate schedule on the fe, this function will be called and will send data to the be
async function createNewExam(startDate, endDate, examName, examColour, arrayOfTestIDs) {
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/schedule/createNewExam",
            data: { startDate: startDate, endDate: endDate, examName: examName, examColour: examColour, arrayOfTestIDs: arrayOfTestIDs }
        });

        // console.log(response.data);
        return response.data; // retrieve success/ fail message from the backend
    }
    catch (error) {
        return error.response.data.message;
    }
}

async function deleteExistingExam(scheduleID) {
    try {
        const response = await axiosInstance({
            method: "delete",
            url: "/schedule/deleteExistingExam",
            data: { scheduleID: scheduleID }
        });

        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

async function deleteSpecificRevisionDate(scheduleID, revisionDate) {
    try {
        const response = await axiosInstance({
            method: "delete",
            url: "/schedule/deleteSpecificRevisionDate",
            data: { scheduleID: scheduleID, revisionDate: revisionDate }
        });
        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

export { createNewExam, retrieveAllRevisionDates, deleteExistingExam, deleteSpecificRevisionDate };