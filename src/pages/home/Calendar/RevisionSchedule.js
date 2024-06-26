import React, { useState, useEffect } from 'react';
import '../../../styles/RevisionSchedule.css'; 
import { createNewExam, DeleteExistingExam, DeleteSpecificRevisionDate, retrieveAllRevisionDates } from '../../../services (for backend)/ScheduleService';
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
	const [examColour, setExamColour] = useState(''); // default colour is blue

    // State for day modal
	const [isOpen, setIsOpen] = useState(false); 
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEvents, setSelectedEvents] = useState([]);

	// State for delete confirmation modal
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
    const [eventToDelete, setEventToDelete] = useState(null); // State to store event to delete

    /*
    ------------------------------------------------------------------------------------------------------------------------------------
    FUNCTIONS
    ------------------------------------------------------------------------------------------------------------------------------------
    */

    // retrieve names of flashcards from backend to display as dropdown menu @ SHI HUI UR CODE HERE
    async function fetchAllFlashcardsWithoutSchedule(){
        const returnedArray = await getAllFlashcardsWithoutSchedule(email);
        setArrayOfAvailableFlashcards(returnedArray);
    }

    // retreive revision dates from the backend @ JERRICK UR CODE GOES HERE
    async function fetchRevisonDates(){
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
    }

    // WHEN USER CLICKS GENERATE SCHEDULE -> SEND DATA TO THE BACKEND
    const handleGenerateSchedule = async () => {
        if (!startDate || !examName) {
            window.alert("Please enter subject name and start date before generating the schedule.");
            return;
        }
        try {
            await createNewExam(startDate, endDate, examName, examColour, selectedTestIDs); 
			console.log({startdate: startDate, enddate: endDate, examname: examName, examcolour: examColour, testIDs: selectedTestIDs});            
            window.location.reload(); // REFRESH THE PAGE SO FORM INPUT FIELDS WILL BE RESET
        } 
		catch (error) {
            console.error('Failed to generate schedule:', error.message || 'Error');
        }
    };

    // OPEN THE MODAL WHEN USER CLICKS ON A DATE IN THE CALENDAR
    const handleDateClick = (arg) => {
        const clickedDate = arg.dateStr; // YYYY-MM-DD format
        setSelectedDate(clickedDate);
        const eventsOnDate = calendarEvents.filter(event => event.start === clickedDate);
        setSelectedEvents(eventsOnDate);
        setIsOpen(true); // Open the modal
        console.log("Clicked date:", clickedDate); // Debug
    };

    const handleDeleteEvent = ({ event }) => {
        setEventToDelete(event); // store the event to be deleted
        setIsDeleteModalOpen(true); // open the delete confirmation modal
        console.log("Event to delete:", event);
    };
    
    // DELETE ENTIRE SCHEDULE
    const handleDeleteAll = async () => {
        if (eventToDelete) {
            console.log("trying to delete entire schedule for exam with schedule ID:", eventToDelete.id);
    
            try {
                const result = await DeleteExistingExam(eventToDelete.id);
    
                if (result === 'ok deleted entire exam from db') { // message from the backend
                    window.alert(`Exam '${eventToDelete.title}' deleted successfully.`); // WHY IS THIS SHOWING EVEN THOUGH THERES NO CORRESPONDING EVENT TO DELETE IN THE DB?
                    setExams(exams.filter(exam => exam.ScheduleID !== eventToDelete.id));
                } 
                else { window.alert('Failed to delete the exam, try again') ; }
            } 
            catch (error) {
                console.log('Error deleting the exam');
                window.alert('Failed to delete the exam, try again');
            } 
            finally {
                setIsDeleteModalOpen(false); // close the delete confirmation modal
                setEventToDelete(null); // reset the event to delete
            }
        } 
        else { console.error("No eventToDelete found") ; }
    };
    
    // DELETE A SINGLE REVISION DATE
    const handleDeleteOne = async () => {
        if (eventToDelete && selectedDate) {
            try {			
                const result = await DeleteSpecificRevisionDate(eventToDelete.id, selectedDate); 
                console.log(selectedDate);
                
                if (result === 'ok deleted specific date from db') {
                    window.alert(`Date '${selectedDate}' for exam '${eventToDelete.title}' deleted successfully.`);
                    setExams(prevExams => prevExams.map(exam => {
                        if (exam.ScheduleID === eventToDelete.id) {
                            return {
                                ...exam,
                                revisionDates: exam.revisionDates.filter(date => date !== selectedDate)
                            };
                        }
                        return exam;
                    }));
                } 
                else {
                    window.alert('Failed to delete the specific date, try again');
                }
            } 
            catch (error) {
                console.log('Error deleting the specific date, try again');
                window.alert('Failed to delete the specific date, try again');
            } 
            finally {
                setIsDeleteModalOpen(false); 
                setEventToDelete(null); 
            }
        }
    };

    // FETCH RELEVANT DATA WHEN THE PAGE IS RENDERED FOR THE FIRST TIME
    useEffect(() => {
        fetchAllFlashcardsWithoutSchedule();
        fetchRevisonDates();
    }, []);

	return (
		<div className='calendarContainer'> 
			<h3>Struggling to plan a revision schedule?</h3>
			<h1>Daddy's got your back!</h1>
			<div className='inputContainerforMaunual'>
                <div className='input'>
                    Flashcard:
                    <select onChange={(e) => setSelectedTestIDs([e.target.value])}>
                        <option disabled selected> Choose a flashcard </option>
                        {arrayOfAvailableFlashcards.length === 0 
                            ? <option> No flashcards available </option> 
                            : arrayOfAvailableFlashcards.map((flashcard) => (
                                <option key={flashcard.TestID} value={flashcard.TestID}> {flashcard.TestName} </option>
                            ))
                        }
                    </select>
                </div>
				<div className='input'>Exam Name: <input type="text" placeholder="Enter Subject" value={examName} onChange={(e) => setExamName(e.target.value)}/></div>
				<div className='input'>Start date: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
				<div className='input'>End date: <input type="date" value={endDate || ''} onChange={(e) => setEndDate(e.target.value)} /></div>
				<div className='input'>Colour: <input type="color" value={examColour} onChange={(e) => setExamColour(e.target.value)} /></div>
				<button onClick={handleGenerateSchedule}>Generate Schedule</button>
			</div>
			<div className='calendar'>
				<FullCalendar
					plugins={[dayGridPlugin,interactionPlugin]}
					initialView="dayGridMonth"
					events={calendarEvents}
					height="auto"
					eventClick={handleDeleteEvent}
					dateClick={handleDateClick}
                    showNonCurrentDates={false}
				/>
			</div>
			
			<DayModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                date={selectedDate}
                events={selectedEvents}
            />

			<DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDeleteAll={handleDeleteAll}
                onDeleteOne={handleDeleteOne}
            />
		</div>
	);
}

export default Calendar;