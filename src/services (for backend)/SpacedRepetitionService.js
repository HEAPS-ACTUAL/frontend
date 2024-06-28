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

async function createNewEvent(startDate, endDate, eventName){
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/schedule/createNewEvent",
            data: { startDate: startDate, endDate: endDate, eventName: eventName}
        });
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
}

export { createNewEvent, getRevisionDates };