import axiosInstance from "../utility/axiosInstance";


async function generateSpacedRepetitionSchedule(StartDate, EndDate, EventName) {
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/schedule/generateSpacedRepetitionSchedule",
            data: { StartDate, EndDate },
        });
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
}

async function getRevisionDates(ScheduleId, RevisionDates) {
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

export { generateSpacedRepetitionSchedule, getRevisionDates };

// SHI HUI'S CODE

// export const saveScheduleToDB = async (StartDate, EndDate, ExamName) => {
//     try {
//         const response = await axiosInstance.post("/api/schedules", {
//             StartDate,
//             EndDate,
//             ExamName,
//         });

//         return response.data.scheduleId;
//     } catch (error) {
//         console.error("Error saving schedule to DB:", error);
//     }
// };

// export const saveRevisionDatesToDB = async (scheduleId, revisionDates) => {
//     try {
//         await axiosInstance.post("/api/revision-dates", {
//             scheduleId,
//             revisionDates,
//         });
//     } catch (error) {
//         console.error("Error saving revision dates to DB:", error);
//     }
// };

