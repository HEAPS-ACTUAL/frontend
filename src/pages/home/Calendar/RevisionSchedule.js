import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import Select from 'react-select';
import styles from '../../../styles/RevisionSchedule.module.css';

// icon components
import { CgArrowTopRight } from "react-icons/cg";

// Functions
import { createNewExam, retrieveAllRevisionDates } from '../../../services/ScheduleService';
import { getAllFlashcardsWithoutSchedule } from '../../../services/FlashcardService';

// calendar component
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// day modal component
import DayModal from "../../modals/DayModal";
import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";
import FlashcardModal from '../../modals/FlashcardModal';
import { useNavigate } from 'react-router-dom';

function Calendar() {
    const navigate = useNavigate();

    // GET EMAIL OF USER TO BE USED IN SOME OF THE FUNCTIONS BELOW
    const email = sessionStorage.getItem("userEmail");

    /*
    ------------------------------------------------------------------------------------------------------------------------------------
    USE STATES
    ------------------------------------------------------------------------------------------------------------------------------------
    */
    // STATES NEEDED TO RENDER THE PAGE
    const [arrayOfAvailableFlashcards, setArrayOfAvailableFlashcards] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);

    // STATES FOR SCHEDULE GENERATION
    const [selectedTestIDs, setSelectedTestIDs] = useState([]);
    const [examName, setExamName] = useState(""); // examName is the subject
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState(null);
    const [examColour, setExamColour] = useState("#808080"); // default colour is grey
    const [errorMessage, setErrorMessage] = useState('');
    
    // STATES FOR FLASHCARD MODAL
    const [isFlashcardModalOpen, setFlashcardModalOpen] = useState(false);
    const [clickedScheduleID, setClickedScheduleID] = useState(null);

    // State for day modal
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);

    // State for delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null); // State to store event to delete

    /*
    ------------------------------------------------------------------------------------------------------------------------------------
    FUNCTIONS
    ------------------------------------------------------------------------------------------------------------------------------------
    */
    
    // FETCH RELEVANT DATA WHEN THE PAGE IS RENDERED FOR THE FIRST TIME
    useEffect(() => {
        // retrieve names of flashcards from backend to display as dropdown menu 
        async function fetchAllFlashcardsWithoutSchedule() {
            const returnedArray = await getAllFlashcardsWithoutSchedule(email);
            setArrayOfAvailableFlashcards(returnedArray);
        }

        // retreive revision dates from the backend and retrieve today's date and events to display in modal
        async function fetchRevisonDatesAndTodaysEvents() {
            const returnedArray = await retrieveAllRevisionDates(email);

            // TRANSFORM EXAMS INTO A FORMAT THAT IS RECOGNISED BY THE CALENDAR EVENT
            const formattedCalendarEventsArray = returnedArray.flatMap((exam) => {

                // an array of revision date objects
                const revisionDates = JSON.parse(exam.RevisionDates).map((date) => ({
                    id: [exam.ScheduleID, date],
                    title: exam.ExamName,
                    start: date,
                    backgroundColor: exam.ExamColour,
                    borderColor: 'transparent',
                    flashcards: JSON.parse(exam.Flashcards)
                }))

                // create an object for the exam date
                const examDates = {
                    id: exam.EndDate ? [exam.ScheduleID, exam.EndDate.slice(0, 10)] : [exam.ScheduleID, null],
                    title: `🗓️ ${exam.ExamName}`,
                    start: exam.EndDate ? exam.EndDate.slice(0, 10) : null,
                    backgroundColor: exam.ExamColour,
                    borderColor: 'black',
                    flashcards: JSON.parse(exam.Flashcards)
                }

                revisionDates.push(examDates); // append the exam date object into the array of revision date objects

                return revisionDates;
            });

            setCalendarEvents(formattedCalendarEventsArray);

            // FETCHING TODAY'S DATE AND EVENTS
            const dateLocaleString = new Date().toLocaleDateString("en-GB"); // example of the dateLocaleString format: "20/12/2012, 03:00:00"
            const curDate = dateLocaleString.split("/")

            const day = curDate[0];
            const month = curDate[1];
            const year = curDate[2];

            const formattedDate = `${year}-${month}-${day}`;
            const todaysEvents = formattedCalendarEventsArray.filter((event) => event.start === formattedDate);

            setSelectedDate(formattedDate);
            setSelectedEvents(todaysEvents);
        }

        fetchAllFlashcardsWithoutSchedule();
        fetchRevisonDatesAndTodaysEvents();

    }, [email]);

    // TAKES IN THE SELECTED FLASHCARDS TO GENERATE THE SCHEDULE
    function handleSelectChange(selectedOptions) {
        const selectedIDs = selectedOptions.map((option) => option.value);
        setSelectedTestIDs(selectedIDs);
    }

    // WHEN USER CLICKS GENERATE SCHEDULE -> SEND DATA TO THE BACKEND
    const handleGenerateSchedule = async () => {
        if (!startDate || !examName) {
            setErrorMessage("Please enter exam name and start date!");
        }
        else if (selectedTestIDs.length === 0) {
            setErrorMessage("Please select at least 1 flashcard!");
        }
        else if (endDate && startDate > endDate) {
            setErrorMessage("Start date cannot be after end date!");
        }
        else {
            try {
                await createNewExam(startDate, endDate, examName, examColour, selectedTestIDs);

                navigate(
                    '../../../loading-page', 
                    {state: 
                        {
                            duration: 1500, 
                            messageArray: [`Creating revision schedule now...`], 
                            redirect: '/home/revision-schedule'
                        } 
                    }
                )
            }
            catch (error) {
                window.alert("Failed to generate schedule:", error.message || "Error");
            }
        }
    };

    // WHEN USER CLICKS ON A DATE IN THE CALENDAR
    const handleDateChange = (arg) => {
        const clickedDate = arg.dateStr; // YYYY-MM-DD format
        setSelectedDate(clickedDate);
        const eventsOnDate = calendarEvents.filter((event) => event.start === clickedDate);
        setSelectedEvents(eventsOnDate);
    }

    function showFlashcardModal(scheduleID) {
        setClickedScheduleID(scheduleID);
        setFlashcardModalOpen(true); // open the flashcard modal
    }

    const showDeleteModal = (event) => {
        setEventToDelete(event);
        setIsDeleteModalOpen(true); // open the delete confirmation modal
    }

    return (
        <div className={styles.entirePage}>
            <div className={styles.schedule}>
                <p className={styles.topline}>Struggling to plan a revision schedule?</p>
                <p className={styles.bottomline}> Daddy's got your back!</p>
                <p className={styles.tagline}><HashLink smooth to='/features#spaced-repetition'>powered by our spaced repetition algorithm <section className={styles.learnMoreBtn}><CgArrowTopRight /></section></HashLink></p>


                <div className={styles.calendarContainer}>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={calendarEvents}
                        height="auto"
                        dateClick={handleDateChange}
                        showNonCurrentDates={false}
                        fixedWeekCount={false}
                        eventClick={(info) => showFlashcardModal(info.event.id.split(',')[0])}
                    />
                </div>

                <FlashcardModal
                    isOpen={isFlashcardModalOpen}
                    scheduleID={clickedScheduleID}
                    onClose={() => setFlashcardModalOpen(false)}
                />

            </div>
            <div className={styles.todaysEventsAndGenerateSchedule}>
                <DayModal
                    date={selectedDate}
                    events={selectedEvents}
                    handleEventClick={showFlashcardModal}
                    handleDeleteClicked={showDeleteModal}
                />

                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    closeModal={() => setIsDeleteModalOpen(false)}
                    event={eventToDelete}
                />

                <div className={styles.generateSchedule}>
                    <h3>Generate Revision Schedule!</h3>
                    <div className={styles.inputFields}>

                        <div className={styles.examName}>
                            <input type="text" placeholder="Exam Name" value={examName} onChange={(e) => setExamName(e.target.value)} />
                        </div>

                        <Select
                            className={styles.selectFlashcards}
                            options={arrayOfAvailableFlashcards}
                            isMulti={true}
                            hideSelectedOptions={true}
                            isClearable={true}
                            placeholder="Select Flashcard(s)"
                            onChange={handleSelectChange}
                        />

                        <div className={styles.startDate}>
                            <p>Start Date:</p>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>

                        <div className={styles.endDate}>
                            <p>Exam Date (if applicable):</p>
                            <input type="date" value={endDate || ""} onChange={(e) => setEndDate(e.target.value)} />
                        </div>

                        <div className={styles.examColourAndSubmit}>
                            <div className={styles.examColour}>
                                <p> Colour:</p>
                                <input type="color" value={examColour} onChange={(e) => setExamColour(e.target.value)} />
                            </div>

                            <button className={styles.generateScheduleButton} onClick={handleGenerateSchedule}> Submit! </button>
                        </div>
                    </div>
                        
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                
                </div>
            </div>
        </div>
    )
}

export default Calendar;