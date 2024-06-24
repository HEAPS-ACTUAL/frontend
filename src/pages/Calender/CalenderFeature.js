import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/RevisionSchedule.module.css";
import EventForm from "./EventForm";
import CalendarControls from "./CalenderControls";
import CalendarDays from "./CalenderDays";
import {
  calculateSpacedRepetitionDates,
  saveScheduleToDB,
  saveRevisionDatesToDB,
} from "../../utility/utils";

const CalendarFeature = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date state
  const [events, setEvents] = useState({}); // State to store events
  const [startDate, setStartDate] = useState(null); // State to store the start date
  const [endDate, setEndDate] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to track if editing mode is enabled
  const [eventData, setEventData] = useState({
    date: "",
    title: "",
    description: "",
    color: "#FFE4C4",
  }); // State to store event data
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

  return (
    <div className={styles.calendarContainer}>
      <EventForm
        isEditing={isEditing}
        eventData={eventData}
        setEventData={setEventData}
        handleFormSubmit={handleFormSubmit}
        handleEventDelete={handleEventDelete}
        setIsEditing={setIsEditing}
      />
      <CalendarControls
        months={months}
        currentDate={currentDate}
        changeMonth={changeMonth}
        handleMonthChange={handleMonthChange}
        handleYearChange={handleYearChange}
        years={years}
        startDate={startDate}
        endDate={endDate}
        setEvents={setEvents}
        generateSpacedRepetitionSchedule={generateSpacedRepetitionSchedule}
      />
      <div className={styles.dayNames}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayName}>
            {day}
          </div>
        ))}
      </div>
      <CalendarDays
        currentDate={currentDate}
        events={events}
        startDate={startDate}
        endDate={endDate}
        handleDayClick={handleDayClick}
        handleEditEvent={handleEditEvent}
        revisionDates={revisionDates}
      />
    </div>
  );
};

export default CalendarFeature;
