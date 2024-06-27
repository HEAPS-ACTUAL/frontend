import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../styles/MonitorProgress.css'; 

function MyCalendar() {
	const [events, setEvents] = useState([]);
	const [eventTitle, setEventTitle] = useState('') // eventTitle is the subject
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [eventColour, setEventColour] = useState('#3788d8'); // default colour is blue
	
	const HandleAddEvent = () => {
		if (!startDate) {
            alert("Please enter a start date");
            return; 
        }

		let newEvent = { title: eventTitle, start: startDate, color: eventColour, end: endDate || null };

		setEvents(prevEvents => [...prevEvents, newEvent]);

        // Clear inputs after adding
		setEventTitle(''); setStartDate(''); setEndDate(''); setEventColour('#3788d8');
	}
	
	const handleDeleteEvent = (eventTitle, startDate) => {
		setEvents(prevEvents => prevEvents.filter(event => event.title !== eventTitle && event.start !== startDate));
	};

	// for the cross button to delete an event
	const DeleteEvent = (eventInfo) => {
		return (
			<div>
				<span>{eventInfo.event.title}</span>
				<button
					onClick={(e) => {
						e.stopPropagation(); 
						if (window.confirm(`Delete this event: ${eventInfo.event.title}?`)) {
							handleDeleteEvent(eventInfo.event.title, eventInfo.event.start);
						}
					}}
					style={{ marginLeft: '160px', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
				>
					&#x2715; {/* Unicode cross symbol */}
				</button>
			</div>
		);
	}
	
	

  	return (
      	<div className='calendarContainer'> 

			<h3>to manually add a subject (for my own reference)</h3>
			<div className='inputContainerforMaunual'>
				<div className='input'>Subject Name: <input type="text" placeholder="Enter Subject" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)}/></div>
				<div className='input'> Start date: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
				<div className='input'> End date: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
				<div className='input'> Colour: <input type="color" value={eventColour} onChange={(e) => setEventColour(e.target.value)} /></div>
				<button onClick={HandleAddEvent}>Add Subject</button>
			</div>

			<h3>to generate spaced repetition schedule</h3>
			<div className=''>

			</div>
			
			<div className='calendar'>
        	<FullCalendar
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				events={events}
				height="auto"
				eventContent={DeleteEvent} 
			/>

			
			</div>
      	</div>
  );
}

export default MyCalendar;


// add input field to get start date and end date
// end date always null unless user inputs end date 
// color field to allow user to change colour

