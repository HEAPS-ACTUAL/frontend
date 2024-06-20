import React, { useState } from "react";
import styles from "../../styles/RevisionSchedule.module.css";

const CalendarFeature = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState({
    date: "",
    title: "",
    description: "",
    color: "#f39c12",
  });

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
    const date = new Date(dateKey);
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateKey);
      setEndDate(null);
    } else if (!endDate && date >= new Date(startDate)) {
      setEndDate(dateKey);
    } else if (startDate && !endDate) {
      setStartDate(dateKey);
      setEndDate(null);
      setEvents({});
    }
  };

  const handleEditEvent = (dateKey) => {
    const event = events[dateKey];
    setEventData({
      date: dateKey,
      title: event.title,
      description: event.description,
      color: event.color,
    });
    setIsEditing(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { date, title, description, color } = eventData;
    if (date && title) {
      setEvents({ ...events, [date]: { title, description, color } });
      setEventData({ date: "", title: "", description: "", color: "##7FFF00" });
      setIsEditing(false);
    } else {
      alert("Please fill in the event title.");
    }
  };

  const handleEventDelete = (dateKey) => {
    const newEvents = { ...events };
    delete newEvents[dateKey];
    setEvents(newEvents);
    setEventData({ date: "", title: "", description: "", color: "##7FFF00" });
    setIsEditing(false);
  };

  const generateQuiz = () => {
    if (startDate && endDate) {
      alert(`Generating quiz for the period from ${startDate} to ${endDate}`);
    } else {
      alert("Please select both start and end dates.");
    }
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
      const event = events[dateKey];
      let dayClass = styles.day;

      if (startDate && endDate && date >= start && date <= end) {
        dayClass = `${styles.day} ${styles.selectedRangeDay}`;

        //rmb here must concatenate the styles.day otherwise wont work
      } else if (dateKey === startDate || dateKey === endDate) {
        dayClass = `${styles.day} ${styles.selectedDay}`;
      }

      days.push(
        <div
          key={i}
          className={dayClass}
          onClick={() => handleDayClick(dateKey)}
          onDoubleClick={() => handleEditEvent(dateKey)}
          style={{ backgroundColor: event ? event.color : "" }}
        >
          {i}
          {event && (
            <div className={styles.event}>
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
    return days;
  };

  return (
    <div className={styles.calendarContainer}>
      <form onSubmit={handleFormSubmit} className={styles.eventForm}>
        <h3>{isEditing ? "Edit Event" : "Add Event"}</h3>
        <label>
          Date:
          <input
            type="date"
            value={eventData.date}
            onChange={(e) =>
              setEventData({ ...eventData, date: e.target.value })
            }
            required
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            value={eventData.title}
            onChange={(e) =>
              setEventData({ ...eventData, title: e.target.value })
            }
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={eventData.description}
            onChange={(e) =>
              setEventData({ ...eventData, description: e.target.value })
            }
          />
        </label>
        <label>
          Color:
          <input
            type="color"
            value={eventData.color}
            onChange={(e) =>
              setEventData({ ...eventData, color: e.target.value })
            }
          />
        </label>
        <div className={styles.formButtons}>
          <button type="submit" className={styles.saveButton}>
            {isEditing ? "Save Changes" : "Add Event"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => handleEventDelete(eventData.date)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              setEventData({
                date: "",
                title: "",
                description: "",
                color: "#f39c12",
              })
            }
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
      <div className={styles.controls}>
        <div className={styles.dateSelector}>
          <button onClick={() => setEvents({})} className={styles.clearButton}>
            Clear Events
          </button>
          <button
            onClick={generateQuiz}
            className={styles.generateButton}
            disabled={!startDate || !endDate}
          >
            Generate Quiz
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
