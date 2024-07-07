import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../../../styles/RevisionSchedule.css'; 
import { createNewExam, retrieveAllRevisionDates } from '../../../services (for backend)/ScheduleService';
import { getAllFlashcardsWithoutSchedule } from '../../../services (for backend)/FlashcardService';

// calendar component
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// modal component
import DayModal from './DayModal';
import interactionPlugin from '@fullcalendar/interaction';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function Calendar() {
    // GET EMAIL OF USER TO BE USED IN SOME OF THE FUNCTIONS BELOW
    const email = sessionStorage.getItem('userEmail');

    /*
    ------------------------------------------------------------------------------------------------------------------------------------
    USE STATES
    ------------------------------------------------------------------------------------------------------------------------------------
    */
    // STATES NEEDED TO RENDER THE PAGE
    const [arrayOfAvailableFlashcards, setArrayOfAvailableFlashcards] = useState([]);
    const [exams, setExams] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);

    // STATES FOR SCHEDULE GENERATION
    const [selectedTestIDs, setSelectedTestIDs] = useState([]);
	const [examName, setExamName] = useState('') // examName is the subject
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState(null)
	const [examColour, setExamColour] = useState('#808080'); // default colour is blue

    // State for day modal
	// const [isOpen, setIsOpen] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);

	// State for delete confirmation modal
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
    const [eventToDelete, setEventToDelete] = useState(null); // State to store event to delete

    /*
    ------------------------------------------------------------------------------------------------------------------------------------
    FUNCTIONS
    ------------------------------------------------------------------------------------------------------------------------------------
    */
   // FETCH RELEVANT DATA WHEN THE PAGE IS RENDERED FOR THE FIRST TIME
   useEffect(() => {
       
        // retrieve names of flashcards from backend to display as dropdown menu @ SHI HUI UR CODE HERE
       async function fetchAllFlashcardsWithoutSchedule(){
           const returnedArray = await getAllFlashcardsWithoutSchedule(email);
           setArrayOfAvailableFlashcards(returnedArray);
       }
    
       // retreive revision dates from the backend and retrieve today's date and events to display in modal
       async function fetchRevisonDatesAndTodaysEvents(){
            const returnedArray = await retrieveAllRevisionDates(email);
            setExams(returnedArray);

            // TRANSFORM EXAMS INTO A FORMAT THAT IS RECOGNISED BY THE CALENDAR EVENT
            const formattedCalendarEventsArray = returnedArray.flatMap(exam =>
                JSON.parse(exam.RevisionDates).map(date => ({   
                    id: [exam.ScheduleID, date], // for handleDeleteEvent function
                    title: exam.ExamName,
                    start: date,
                    color: exam.ExamColour,
                    flashcards: JSON.parse(exam.Flashcards)
                }))
            );
    
            setCalendarEvents(formattedCalendarEventsArray);

            // FETCHING TODAY'S DATE AND EVENTS
            const dateLocaleString = new Date().toLocaleString();

            const day = dateLocaleString.slice(0, 2);
            const month = dateLocaleString.slice(3, 5);
            const year = dateLocaleString.slice(6, 10);

            const formattedDate = `${year}-${month}-${day}`;
            const todaysEvents = formattedCalendarEventsArray.filter(event => event.start === formattedDate);
            
            setSelectedDate(formattedDate);
            setSelectedEvents(todaysEvents);
        }

        fetchAllFlashcardsWithoutSchedule();
        fetchRevisonDatesAndTodaysEvents();

    }, [email]);

    // TAKES IN THE SELECTED FLASHCARDS TO GENERATE THE SCHEDULE
    function handleSelectChange(selectedOptions){
        const selectedIDs = selectedOptions.map(option => option.value);
        setSelectedTestIDs(selectedIDs);
    }

    // WHEN USER CLICKS GENERATE SCHEDULE -> SEND DATA TO THE BACKEND
    const handleGenerateSchedule = async () => {
        if (!startDate || !examName) {
            window.alert("Please enter exam name and start date!");
        }
        else if (selectedTestIDs.length === 0){
            window.alert("Please select at least 1 flashcard!");
        }
        else if (endDate && startDate > endDate) {
            window.alert("Start date cannot be after end date!");
        }
        else {
            try {
                await createNewExam(startDate, endDate, examName, examColour, selectedTestIDs);
                console.log({startdate: startDate, enddate: endDate, examname: examName, examcolour: examColour, testIDs: selectedTestIDs});            
                window.alert('Schedule generated successfully!');
                window.location.reload(); // REFRESH THE PAGE SO FORM INPUT FIELDS WILL BE RESET
            } 
            catch (error) {
                console.error('Failed to generate schedule:', error.message || 'Error');
            }
        }

    };

    // WHEN USER CLICKS ON A DATE IN THE CALENDAR
    const handleDateChange = (arg) => {
        const clickedDate = arg.dateStr; // YYYY-MM-DD format
        setSelectedDate(clickedDate);
        const eventsOnDate = calendarEvents.filter(event => event.start === clickedDate);
        setSelectedEvents(eventsOnDate);
        // console.log("Clicked date:", clickedDate); // Debug
    };

    const showDeleteModal = (event) => {
        setEventToDelete(event);
        setIsDeleteModalOpen(true); // open the delete confirmation modal
    };

	return (
		<div className='entirePage'>
            <div className='schedule'>
                <p className='topline'>Struggling to plan a revision schedule?</p>
                <p className='bottomline'> Daddy's got your back!</p>
            
                <div className='calendarContainer'>
                    <FullCalendar
                        plugins={[dayGridPlugin,interactionPlugin]}
                        initialView="dayGridMonth"
                        events={calendarEvents}
                        height="auto"
                        dateClick={handleDateChange}
                        showNonCurrentDates={false}
                        fixedWeekCount={false}
                />
                </div>
            </div>
            <div className='todaysEventsAndGenerateSchedule'>
                <DayModal
                    date={selectedDate}
                    events={selectedEvents}
                    handleDeleteClicked={showDeleteModal}
                />
                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    closeModal={() => setIsDeleteModalOpen(false)}
                    event={eventToDelete}
                />
                <div className='generateSchedule'>
                    <h3>Generate revision Schedule</h3>
                    <div className='inputFields'>

                        <div className='examName'>
                            <input type="text" placeholder="Exam Name" value={examName} onChange={(e) => setExamName(e.target.value)}/>
                        </div>

                        <Select
                            className='selectFlashcards'
                            options={arrayOfAvailableFlashcards}
                            isMulti={true}
                            hideSelectedOptions={true}
                            isClearable={true}
                            placeholder='Select Flashcard(s)'
                            onChange={handleSelectChange}
                        /> 

                        <div className='startDate'>
                            <p>Start Date:</p>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>

                        <div className='endDate'>
                            <p>Exam Date (if applicable):</p>
                            <input type="date" value={endDate || ''} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        
                        <div className='examColourAndSubmit'>
                            <div className='examColour'>
                                <p> Colour:</p>
                                <input type="color" value={examColour} onChange={(e) => setExamColour(e.target.value)}/>
                            </div>

                            <button className='generateScheduleButton' onClick={handleGenerateSchedule}> Submit! </button>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default Calendar;