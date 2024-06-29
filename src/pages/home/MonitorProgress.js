import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../styles/MonitorProgress.css'; 
import { createNewExam, GetExamDetailsForCalendar, DeleteExistingExam } from '../../services (for backend)/SpacedRepetitionService';

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


/*
------------------------------------------------------------------------------------------------------------------------------------
retreive revision dates from the backend @JERRICK UR CODE GOES HERE
------------------------------------------------------------------------------------------------------------------------------------
*/


/*
------------------------------------------------------------------------------------------------------------------------------------
transform exams state into FullCalendar exam format
------------------------------------------------------------------------------------------------------------------------------------
*/
const calendarEvents = exams.flatMap(exam =>
    exam.revisionDates.map(date => ({   // Changed from 'exam.exams' to 'exam.revisionDates'
        title: exam.examName,           // Make sure property names match those in state
        start: date,
        color: exam.examColour,         // Make sure property names match those in state
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
const handleDeleteEvent = async ({ event }) => {
	if (window.confirm(`Are you sure you want to delete this exam: ${event.title}?`)) {
		event.remove();  
		// console.log(event.ScheduleID);

		// try{
		// 	// delete exam from the database
		// 	const result = await DeleteExistingExam(exams.ScheduleID);
		// 	window.alert('exam deleted:', event.title);
		// }
		// catch (error){
		// 	window.alert('Failed to delete the exam, try again');
		// }
	
	}
};


	// for testing
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
					plugins={[dayGridPlugin]}
					initialView="dayGridMonth"
					events={calendarEvents}
					height="auto"
					eventClick={handleDeleteEvent}  
				/>
			</div>
		</div>
	);
}

export default Calendar;