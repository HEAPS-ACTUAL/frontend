import axiosInstance from "../utility/axiosInstance";

async function GetExamDetailsForCalendar(scheduleID, examName, examColour, revisionDates) { 
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/schedule/GetExamDetailsForCalendar",
            data: { scheduleID: scheduleID, examName: examName, examColour: examColour, revisionDates: revisionDates },
        });
        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

// once i click generate schedule on the fe, this function will be called and will send data to the be
async function createNewExam(startDate, endDate, examName, examColour, arrayOfTestIDs){
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/schedule/createNewExam",
            data: { startDate: startDate, endDate: endDate, examName: examName, examColour: examColour, arrayOfTestIDs: arrayOfTestIDs }
        });

        // console.log(response.data);
        return response.data; // retrieve success/ fail message from the backend
    } catch (error) {
        return error.response.data.message;
    }
}

// ask jerrick to check
async function DeleteExistingExam(scheduleID){
    console.log('retrieving scheduleID: ' , scheduleID);
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/schedule/DeleteExistingExam",
            data: { scheduleID: scheduleID }
        });

        return response.data;
    } 
    catch (error) {
        return error.response.data.message;
    }
}

async function DeleteSpecificRevisionDate(scheduleID, revisionDate){
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/schedule/DeleteSpecificRevisionDate",
            data: { scheduleID: scheduleID, revisionDate: revisionDate }
        });
        return response.data;
    }   
    catch (error) {
        return error.response.data.message;
    }
}
export { createNewExam, GetExamDetailsForCalendar, DeleteExistingExam, DeleteSpecificRevisionDate };