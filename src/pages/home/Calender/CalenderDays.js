import React from "react";
import styles from "../../../styles/RevisionSchedule.module.css";

const CalendarDays = ({
  currentDate,
  events,
  startDate,
  endDate,
  handleDayClick,
  handleEditEvent,
  revisionDates,
  handleEventDelete,
}) => {
  const renderDays = () => {
    console.log("Rendering days...");
    const days = [];
    const daysCount = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate(); // Number of days in the current month
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay(); // First day of the month

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let i = 1; i <= daysCount; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateKey = `${year}-${month}-${day}`;
      const event = events[dateKey];
      const isRevisionDate = revisionDates.includes(dateKey); // Check if it's a revision date
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

      days.push(
        <div
          key={i}
          className={dayClass}
          onClick={() => handleDayClick(dateKey)}
          onDoubleClick={() => handleEditEvent(dateKey)}
          style={{
            backgroundColor: isRevisionDate
              ? "#008000"
              : event
              ? event.color
              : "",
          }} // Change color here
        >
          {i}
          {event && (
            <div
              className={styles.event}
              style={{ backgroundColor: event.color }}
            >
              <span>{event.title}</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleEventDelete(dateKey)}
              >
                x
              </button>
            </div>
          )}
        </div>
      );
    }
    console.log("Rendering days with events:", events);
    return days;
  };

  return <div className={styles.daysContainer}>{renderDays()}</div>;
};

export default CalendarDays;
