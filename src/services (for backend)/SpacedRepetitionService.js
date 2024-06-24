import axiosInstance from "../utility/axiosInstance";


// DONT TOUCH THIS FILE FIRST, finalise the FE first
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
  