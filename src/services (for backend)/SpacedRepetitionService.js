import axiosInstance from "../utility/axiosInstance";


// DONT TOUCH THIS FILE FIRST, finalise the FE first
export const CalculateSpacedRepetitionDates = (startDate, endDate) => {


    const currentDate = new Date(startDate); // DONT CHANGE THIS, need this for the while loop calculation
    const currentDateCorrectFormat = currentDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD to push into reviewDates array
    const reviewDates = [currentDateCorrectFormat];

    let intervals;

    if (endDate === null) {
        let intervalDays = 1;
        const factor = 1.5; // multiply intervals by 1.5
        const endDate = new Date(startDate); // Copy start date to calculate the end date
        endDate.setMonth(endDate.getMonth() + 6); // Set end date to 6 months after the start date


        while (currentDate < endDate) {
            currentDate.setDate(currentDate.getDate() + Math.round(intervalDays));

            // Stop if the next review date is beyond six months
            if (currentDate >= endDate) {
                break;
            }

            reviewDates.push(currentDate.toISOString().split('T')[0]); // Store the formatted date
            intervalDays *= factor; // Increase the interval by the factor
        }

    }

    else {

        const end = new Date(endDate);

        // ensure start date is before end date
        if (currentDate >= end) {
            throw new Error('Start date must be before End date'); // window alert for this
        }

        // Calculate the number of days between start date and end date
        const daysBetween = Math.ceil((end - currentDate) / (1000 * 60 * 60 * 24));

        console.log(daysBetween);

        // set the intervals based on the number of days btwn startDate and endDate
        if (daysBetween <= 7) {
            intervals = [1, 1, 1, 1];
        }
        else if (daysBetween <= 14) {
            intervals = [1, 3, 5, 5];
        }
        else if (daysBetween <= 21) {
            intervals = [2, 5, 9, 14, 21];
        }
        else if (daysBetween <= 28) {
            intervals = [2, 4, 7, 7, 7];
        }
        else if (daysBetween <= 35) {
            intervals = [1, 3, 4, 6, 6, 7, 8];
        }
        else {
            intervals = [7, 14, 28];
        }

        let IntervalIndex = 0;

        while (currentDate < end && IntervalIndex < intervals.length) {
            currentDate.setDate(currentDate.getDate() + intervals[IntervalIndex]);
            const formattedDate = currentDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
            reviewDates.push(formattedDate); // Store the formatted date
            IntervalIndex++;
        }
    }

    return reviewDates;
};

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

