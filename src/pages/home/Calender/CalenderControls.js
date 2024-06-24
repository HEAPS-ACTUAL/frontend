import React from "react";
import styles from "../../../styles/RevisionSchedule.module.css";

const CalendarControls = ({
  months,
  currentDate,
  changeMonth,
  handleMonthChange,
  handleYearChange,
  years,
  startDate,
  endDate,
  setEvents,
  generateSpacedRepetitionSchedule,
}) => {
  return (
    <div className={styles.controls}>
      <div className={styles.dateSelector}>
        <button onClick={() => setEvents({})} className={styles.clearButton}>
          Clear Events
        </button>
        <button
          onClick={() => generateSpacedRepetitionSchedule(startDate, endDate)}
          className={styles.generateButton}
          disabled={!startDate || !endDate}
        >
          Generate Schedule
        </button>
      </div>
      <div className={styles.header}>
        <button onClick={() => changeMonth(-1)} className={styles.navButton}>
          Prev
        </button>
        <select
          onChange={handleMonthChange}
          value={currentDate.getMonth()}
          className={styles.monthSelect}
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          onChange={handleYearChange}
          value={currentDate.getFullYear()}
          className={styles.yearSelect}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button onClick={() => changeMonth(1)} className={styles.navButton}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CalendarControls;
