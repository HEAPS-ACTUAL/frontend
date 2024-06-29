import axiosInstance from "../utility/axiosInstance";

async function getRevisionDates(ScheduleId, RevisionDates) { // YET TO CHANGE, CAN BE USED NEXT TIME WHEN WANT TO RETRIEVE REVISION DATES TO SHOW ON THE CALENDAR
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/schedule/getRevisionDates",
            data: { ScheduleId },
        });
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
}

// once i click generate schedule on the fe, this function will be called and will send data to the be
async function createNewEvent(startDate, endDate, eventName, eventColour, arrayOfTestIDs){
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/schedule/createNewEvent",
            data: { startDate: startDate, endDate: endDate, eventName: eventName, eventColour: eventColour, arrayOfTestIDs: arrayOfTestIDs }
        });

        // console.log(response.data);
        return response.data; // retrieve success/ fail message from the backend
    } catch (error) {
        return error.response.data.message;
    }
}

export { createNewEvent, getRevisionDates };