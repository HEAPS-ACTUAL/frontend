import React from "react";
import styles from "../../../styles/RevisionSchedule.module.css";

const CalendarDays = ({
  currentDate,
  events, // Object mapping dates to events
  startDate,
  endDate,
  handleDayClick,
  handleEditEvent,
  revisionDates, // Array of dates marked as revision dates
  handleEventDelete,
}) => {
  // Function to render calendar days based on the current date and month
  const renderDays = () => {
    console.log("Rendering days...");
    const days = [];
    const daysCount = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate(); // Get the number of days in the current month
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay(); // Get the day of the week the month starts on

    // Fill empty slots for days of the week before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    const start = new Date(startDate); // Convert startDate to Date object
    const end = new Date(endDate); // Convert endDate to Date object

    // Loop over each day of the month
    for (let i = 1; i <= daysCount; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const year = date.getFullYear(); // Year part of the current day
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month part, padded for consistency
      const day = String(date.getDate()).padStart(2, "0"); // Day part, padded
      const dateKey = `${year}-${month}-${day}`; // Key for the day
      const event = events[dateKey]; // Get event for the day, if any
      const isRevisionDate = revisionDates.includes(dateKey); // Check if the day is a revision date

      // Set CSS class for the day, change if it's within the selected range or is a start/end date
      let dayClass = styles.day;
      if (startDate && endDate && date >= start && date <= end) {
        dayClass = `${styles.day} ${styles.selectedRangeDay}`;
      } else if (dateKey === startDate || dateKey === endDate) {
        dayClass = `${styles.day} ${styles.selectedDay}`;
      }

      console.log(
        "Rendering day:",
        i,
        "Date Key:",
        dateKey,
        "Event:",
        event,
        "Is Revision Date:",
        isRevisionDate
      );

      // Create a day block for the calendar with click and double-click handlers
      days.push(
        <div
          key={i}
          className={dayClass}
          onClick={() => handleDayClick(dateKey)}
          onDoubleClick={() => handleEditEvent(dateKey)}
          style={{
            backgroundColor: isRevisionDate
              ? "#008000" // Green for revision dates
              : event
              ? event.color // Color for regular events
              : "",
          }} // Set background color based on event or revision status
        >
          {i} // Display the day number
          {event && (
            <div
              className={styles.event}
              style={{ backgroundColor: event.color }} // Style for event indicator
            >
              <span>{event.title}</span> // Display the event title
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent day click event
                  handleEventDelete(dateKey);
                }}
              >
                x // Button to delete the event
              </button>
            </div>
          )}
        </div>
      );
    }
    console.log("Rendering days with events:", events);
    return days; // Return the array of day elements
  };

  // Render the container that holds all the day blocks
  return <div className={styles.daysContainer}>{renderDays()}</div>;
};

export default CalendarDays; // Export the component for use elsewhere in the application
