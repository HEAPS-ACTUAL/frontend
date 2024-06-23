import React, { useState, useEffect } from "react";
import axios from "axios";
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
    color: "#FFE4C4",
  });
  const [revisionDates, setRevisionDates] = useState([]); // New state to store revision dates

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

  useEffect(() => {
    console.log("CalendarFeature component mounted");
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { date, title, description, color } = eventData;
    if (date && title) {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [date]: { title, description, color },
      }));
      console.log("Event added:", { date, title, description, color });
      console.log("Updated events:", events);
      setEventData({ date: "", title: "", description: "", color: "#f39c12" });
      setIsEditing(false);
    } else {
      alert("Please fill in the event title.");
    }
  };

  const handleEventDelete = (dateKey) => {
    const newEvents = { ...events };
    delete newEvents[dateKey];
    setEvents(newEvents);
    console.log("Event deleted:", dateKey);
    console.log("Updated events:", events);
    setEventData({ date: "", title: "", description: "", color: "#f39c12" });
    setIsEditing(false);
  };

  const renderDays = () => {
    console.log("Rendering days...");
    const days = [];
    const daysCount = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

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

  const handleDayClick = (dateKey) => {
    console.log("Day clicked:", dateKey);
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
    console.log("Edit event:", dateKey);
    const event = events[dateKey];
    setEventData({
      date: dateKey,
      title: event.title,
      description: event.description,
      color: event.color,
    });
    setIsEditing(true);
  };

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

  const generateSpacedRepetitionSchedule = async (startDate, endDate) => {
    const scheduleId = await saveScheduleToDB(startDate, endDate, "Exam");
    const revisionDates = calculateSpacedRepetitionDates(
      new Date(startDate),
      new Date(endDate)
    );
    await saveRevisionDatesToDB(scheduleId, revisionDates);
    setStartDate(null); // Clear start date
    setEndDate(null); // Clear end date
    setRevisionDates(revisionDates); // Update revisionDates state
    console.log("Generated Revision Dates:", revisionDates); // Log revision dates
  };

  const saveScheduleToDB = async (startDate, endDate, examName) => {
    try {
      const response = await axios.post("http://localhost:8001/api/schedules", {
        startDate,
        endDate,
        examName,
      });

      return response.data.scheduleId;
    } catch (error) {
      console.error("Error saving schedule to DB:", error);
    }
  };

  const saveRevisionDatesToDB = async (scheduleId, revisionDates) => {
    try {
      await axios.post("http://localhost:8001/api/revision-dates", {
        scheduleId,
        revisionDates,
      });
    } catch (error) {
      console.error("Error saving revision dates to DB:", error);
    }
  };

  const calculateSpacedRepetitionDates = (startDate, endDate) => {
    // Your logic to calculate spaced repetition dates
    const revisionDates = [];
    // Example logic for spaced repetition
    const oneDay = 24 * 60 * 60 * 1000;
    let currentDate = startDate;
    while (currentDate <= endDate) {
      revisionDates.push(new Date(currentDate).toISOString().split("T")[0]);
      currentDate = new Date(currentDate.getTime() + oneDay * 2); // Example: Every 2 days
    }
    return revisionDates;
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
