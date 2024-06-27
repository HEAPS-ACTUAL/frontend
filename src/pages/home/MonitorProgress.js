import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../styles/MonitorProgress.css'; 
import { generateSpacedRepetitionSchedule, getRevisionDates } from '../../services (for backend)/SpacedRepetitionService';

function MyCalendar() {

	const [events, setEvents] = useState([]);
	const [eventTitle, setEventTitle] = useState('') // eventTitle is the subject
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [eventColour, setEventColour] = useState('#3788d8'); // default colour is blue
	
	// for user to manually add their own revision dates
	const HandleAddEvent = () => {
		if (!startDate || !eventTitle) {
            alert("Please enter a start date");
            return; 
        }

		let newEvent = { title: eventTitle, start: startDate, color: eventColour, end: endDate || null };

		setEvents(prevEvents => [...prevEvents, newEvent]);

        // Clear inputs after adding
		setEventTitle(''); setStartDate(''); setEndDate(''); setEventColour('#3788d8');
	}
	
	
	// delete event from the calendar
	const handleDeleteEvent = ({ event }) => {
		if (window.confirm(`Are you sure you want to delete this event: ${event.title}?`)) {
			setEvents(currentEvents => currentEvents.filter(e => e !== event));
			event.remove(); 
		}
	};
	
	// when user clicks generate schedule -> send data to the backend
	const handleGenerateSchedule = async () => {
        if (!startDate || !eventTitle) {
            window.alert("Please enter subject name and start date before generating the schedule.");
            return;
        }

        try {
            const result = await generateSpacedRepetitionSchedule(startDate, endDate, eventTitle);
            console.log('Schedule generated:', result);
            // Optionally fetch revision dates if needed here
            // const revisionDates = await getRevisionDates(result.scheduleId);
            // setEvents(revisionDates);
        } catch (error) {
            console.error('Failed to generate schedule:', error.message || 'Error');
        }
    };

	

	return (
		<div className='calendarContainer'> 
			<h3>Struggling to plan a revision schedule?</h3>
			<h1>Daddy's got your back!</h1>
			<div className='inputContainerforMaunual'>
				<div className='input'>Subject Name: <input type="text" placeholder="Enter Subject" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)}/></div>
				<div className='input'>Start date: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
				<div className='input'>End date: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
				<div className='input'>Colour: <input type="color" value={eventColour} onChange={(e) => setEventColour(e.target.value)} /></div>
				<button onClick={HandleAddEvent}>Add Subject</button>
				<button onClick={handleGenerateSchedule}>Generate Schedule</button>
			</div>
			<div className='calendar'>
				<FullCalendar
					plugins={[dayGridPlugin]}
					initialView="dayGridMonth"
					events={events}
					height="auto"
					eventClick={handleDeleteEvent}  
				/>
			</div>
		</div>
	);
}

export default MyCalendar;



