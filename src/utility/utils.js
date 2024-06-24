import axiosInstance from "./axiosInstance"; // Adjust the path based on your project structure

export const calculateSpacedRepetitionDates = (startDate, endDate) => {
  const currentDate = new Date(startDate); // don't change this, need this for the while loop calculation
  const currentDateCorrectFormat = currentDate.toISOString().split("T")[0]; // Format date to YYYY-MM-DD to push into reviewDates array
  const reviewDates = [currentDateCorrectFormat];

  let intervals;

  if (endDate === null) {
    intervals = [3, 6, 9, 12];

    let IntervalIndex = 0;

    while (IntervalIndex < intervals.length) {
      currentDate.setDate(currentDate.getDate() + intervals[IntervalIndex]);
      const formattedDate = currentDate.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
      reviewDates.push(formattedDate); // Store the formatted date
      IntervalIndex++;
    }
  } else {
    const end = new Date(endDate);

    // ensure start date is before end date
    if (currentDate >= end) {
      throw new Error("Start date must be before End date"); // window alert for this
    }

    // Calculate the number of days between start date and end date
    const daysBetween = Math.ceil((end - currentDate) / (1000 * 60 * 60 * 24));

    console.log(daysBetween);

    // set the intervals based on the number of days btwn startDate and endDate
    if (daysBetween <= 7) {
      intervals = [1, 2, 4, 6];
    } else if (daysBetween <= 14) {
      intervals = [2, 4, 7];
    } else if (daysBetween <= 30) {
      intervals = [4, 8, 15];
    } else {
      intervals = [7, 14, 28];
    }

    let IntervalIndex = 0;

    while (currentDate < end && IntervalIndex < intervals.length) {
      currentDate.setDate(currentDate.getDate() + intervals[IntervalIndex]);
      const formattedDate = currentDate.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
      reviewDates.push(formattedDate); // Store the formatted date
      IntervalIndex++;
    }
  }

  return reviewDates;
};

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
