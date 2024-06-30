import React, { useState, useEffect } from 'react';
import '../../../styles/MonitorProgress.css'; 
import { createNewExam, GetExamDetailsForCalendar, DeleteExistingExam, DeleteSpecificRevisionDate } from '../../../services (for backend)/SpacedRepetitionService';

// calendar component
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// modal component
import DayModal from './DayModal';
import interactionPlugin from '@fullcalendar/interaction';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function Calendar() {

	const [exams, setExams] = useState([
        { ScheduleID: 1, examName: 'Exam 1', examColour: '#2788d8', revisionDates: ['2024-06-01', '2024-06-02', '2024-06-03', '2024-06-04']},
        { ScheduleID: 2, examName: 'Exam 2', examColour: '#a020f0', revisionDates: ['2024-06-11', '2024-06-12', '2024-06-13', '2024-06-14']},
        { ScheduleID: 3, examName: 'Exam 3', examColour: '#ff0000', revisionDates: ['2024-06-18', '2024-06-19', '2024-06-20', '2024-06-21']},
        { ScheduleID: 4, examName: 'Exam 4', examColour: '#ffc0cb', revisionDates: ['2024-06-27', '2024-06-28', '2024-06-29', '2024-06-30']},
    ]);
	const [examName, setExamName] = useState('') // examName is the subject
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState(null)
	const [examColour, setExamColour] = useState('#3788d8'); // default colour is blue


	// State for day modal
	const [isOpen, setIsOpen] = useState(false); 
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEvents, setSelectedEvents] = useState([]);

	// State for delete confirmation modal
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
    const [eventToDelete, setEventToDelete] = useState(null); // State to store event to delete






/*
------------------------------------------------------------------------------------------------------------------------------------
retreive revision dates from the backend @ JERRICK UR CODE GOES HERE
------------------------------------------------------------------------------------------------------------------------------------
*/


/*
------------------------------------------------------------------------------------------------------------------------------------
retrieve names of flashcards from backend to display as dropdown menu @ SHI HUI UR CODE HERE
------------------------------------------------------------------------------------------------------------------------------------
*/
















/*
------------------------------------------------------------------------------------------------------------------------------------
transform exams state into FullCalendar exam format
------------------------------------------------------------------------------------------------------------------------------------
*/
const calendarEvents = exams.flatMap(exam =>
    exam.revisionDates.map(date => ({   
        title: exam.examName,           
        start: date,
        color: exam.examColour,        
		id: exam.ScheduleID // for handleDeleteEvent function 
    }))
);

/*
------------------------------------------------------------------------------------------------------------------------------------
when user clicks generate schedule -> send data to the backend
------------------------------------------------------------------------------------------------------------------------------------
*/
	const handleGenerateSchedule = async () => {
        if (!startDate || !examName) {
            window.alert("Please enter subject name and start date before generating the schedule.");
            return;
        }
        try {
            const result = await createNewExam(startDate, endDate, examName, examColour, [1,2,3]); // hard code the testIDs for now 
			console.log('this is the exam object: ' , startDate, endDate, examName, examColour, [1,2,3]);	
        } 
		catch (error) {
            console.error('Failed to generate schedule:', error.message || 'Error');
        }
    };

/*
------------------------------------------------------------------------------------------------------------------------------------
delete exam from the calendar
------------------------------------------------------------------------------------------------------------------------------------
*/

const handleDeleteEvent = ({ event }) => {
	setEventToDelete(event); // store the event to be deleted
	setIsDeleteModalOpen(true); // open the delete confirmation modal
	console.log("Event to delete:", event);
};

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


/*
------------------------------------------------------------------------------------------------------------------------------------
handles clicking on a day in the calendar -> opens the modal
------------------------------------------------------------------------------------------------------------------------------------
*/
const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr; // YYYY-MM-DD format
    setSelectedDate(clickedDate);
    const eventsOnDate = calendarEvents.filter(event => event.start === clickedDate);
    setSelectedEvents(eventsOnDate);
    setIsOpen(true); // Open the modal
    console.log("Clicked date:", clickedDate); // Debug
};

/*
------------------------------------------------------------------------------------------------------------------------------------
show all the exams in the calendar in the console
------------------------------------------------------------------------------------------------------------------------------------
*/
	useEffect(() => {
		console.log('updated exam state:', exams); 
	}, [exams]);

	return (
		<div className='calendarContainer'> 
			<h3>Struggling to plan a revision schedule?</h3>
			<h1>Daddy's got your back!</h1>
			<div className='inputContainerforMaunual'>
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