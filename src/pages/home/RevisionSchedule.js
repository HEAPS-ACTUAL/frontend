import React, { useState } from "react";
import styles from "../../styles/RevisionSchedule.module.css";

const CalendarFeature = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectingDates, setSelectingDates] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 21 },
    (_, index) => currentYear - 10 + index
  );

  const daysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const changeMonth = (offset) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1
    );
    setCurrentDate(newDate);
  };

  const handleMonthChange = (event) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      parseInt(event.target.value),
      1
    );
    setCurrentDate(newDate);
  };

  const handleYearChange = (event) => {
    const newDate = new Date(
      parseInt(event.target.value),
      currentDate.getMonth(),
      1
    );
    setCurrentDate(newDate);
  };

  const handleDayClick = (dateKey) => {
    if (!selectingDates) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(dateKey);
      setEndDate(null); // Reset end date when start date is set/changed
    } else if (!endDate && dateKey >= startDate) {
      setEndDate(dateKey);
      setSelectingDates(false); // End date selection
    } else if (startDate && endDate) {
      // Reset to new start date if both dates are already selected
      setStartDate(dateKey);
      setEndDate(null);
      setEvents({});
    }
  };

  const generateRevisionSchedule = () => {
    if (!startDate || !endDate) {
      alert("Please select both a start and an end date.");
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    let newEvents = {};
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      newEvents[key] = "Review"; // Example: set a review task
    }
    setEvents(newEvents);
    alert("Revision schedule generated!");
  };

  const renderDays = () => {
    const days = [];
    const daysCount = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

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
      const dateKey = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      let dayClass = styles.day;
      if (
        (start && date >= start && (!end || date <= end)) ||
        dateKey === startDate ||
        dateKey === endDate
      ) {
        dayClass = styles.selectedDay; // Apply selected style
      }
      days.push(
        <div
          key={i}
          className={dayClass}
          onClick={() => handleDayClick(dateKey)}
        >
          {i}
          {events[dateKey] && (
            <div className={styles.event}>{events[dateKey]}</div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.controls}>
        <div className={styles.dateSelector}>
          <button
            onClick={() => setSelectingDates(true)}
            className={styles.selectButton}
          >
            Choose Start/End Dates
          </button>
          <button
            onClick={generateRevisionSchedule}
            className={styles.generateButton}
          >
            Generate Revision Schedule
          </button>
        </div>
        <div className={styles.header}>
          <button onClick={() => changeMonth(-1)}>Prev</button>
          <select onChange={handleMonthChange} value={currentDate.getMonth()}>
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select onChange={handleYearChange} value={currentDate.getFullYear()}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button onClick={() => changeMonth(1)}>Next</button>
        </div>
      </div>
      <div className={styles.dayNames}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayName}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.daysContainer}>{renderDays()}</div>
    </div>
  );
};

export default CalendarFeature;
