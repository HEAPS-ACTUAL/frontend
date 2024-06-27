import axiosInstance from "../utility/axiosInstance";

<<<<<<< Updated upstream
async function generateSpacedRepDates(startDate, endDate){
    const response = await axiosInstance({
        method: "post",
        url: ""
    })
}
=======

async function generateSpacedRepetitionSchedule(startDate, endDate) {
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/test/generateSpacedRepetitionSchedule",
            data: { startDate, endDate },
        });
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
}

async function getRevisionDates(scheduleId) {
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/test/getRevisionDates",
            data: { scheduleId },
        });
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
}

>>>>>>> Stashed changes

// SHI HUI'S CODE

export const saveScheduleToDB = async (startDate, endDate, examName) => {
    try {
        const response = await axiosInstance.post("/api/schedules", {
            startDate,
            endDate,
            examName,
        });

        return response.data.scheduleId;
    } catch (error) {
        console.error("Error saving schedule to DB:", error);
    }
};

export const saveRevisionDatesToDB = async (scheduleId, revisionDates) => {
    try {
        await axiosInstance.post("/api/revision-dates", {
            scheduleId,
            revisionDates,
        });
    } catch (error) {
        console.error("Error saving revision dates to DB:", error);
    }
};

