import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../styles/MonitorProgress.css'; 
import { createNewEvent } from '../../services (for backend)/SpacedRepetitionService';
import DayModal from './Calender/DayModal'; 
import interactionPlugin from '@fullcalendar/interaction';

function Calendar() {

	const [events, setEvents] = useState([]);
	const [eventName, setEventName] = useState('') // eventName is the subject
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState(null)
	const [eventColour, setEventColour] = useState('#3788d8'); // default colour is blue
	
	const [isOpen, setIsOpen] = useState(false); 
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEvents, setSelectedEvents] = useState([]);

	//for testing 
	
	useEffect(() => {
        const testEvent1 = {
            id: '1',
            title: 'Test Event 1',
            start: '2024-06-30',
            end: '2024-06-30',
            color: '#ff0000',
        };

        const testEvent2 = {
            id: '2',
            title: 'Test Event 2',
            start: '2024-06-30',
            end: '2024-06-30',
            color: '#00ff00',
        };

		const testEvent3 ={
			id: '3',
			title: 'Test Event 3',
			start: '2024-06-29',
			end: '2024-06-29',
			color: '#0000ff',
		}

		const testEvent4 ={	
			id: '4',
			title: 'Test Event 4',
			start: '2024-06-28',
			end: '2024-06-',
			color: '#0000ff',
		}

		const testEvent5 ={
			id: '5',
			title: 'Test Event 5',
			start: '2024-06-28',
			end: '2024-06-28',
			color: '#0000ff',
		}

		const testEvent6 ={
			id: '6',
			title: 'Test Event 6',
			start: '2024-06-28',
			end: '2024-06-28',
			color: '#0000ff',
		}

        setEvents([testEvent1, testEvent2, testEvent3, testEvent4, testEvent5, testEvent6]);
    }, []);


	// for user to manually add their own revision dates
	// const HandleAddEvent = () => {
	// 	if (!startDate || !eventName) {
    //         alert("Please enter a start date");
    //         return; 
    //     }

		// let newEvent = { title: eventName, start: startDate, color: eventColour, end: endDate || null };

	// 	setEvents(prevEvents => [...prevEvents, newEvent]);

    //     // Clear inputs after adding
	// 	setEventName(''); setStartDate(''); setEndDate(''); setEventColour('#3788d8');
	// }
	
	
	// delete event from the calendar
	const handleDeleteEvent = ({ event }) => {
		if (window.confirm(`Are you sure you want to delete this event: ${event.title}?`)) {
			setEvents(currentEvents => currentEvents.filter(e => e !== event));
			event.remove(); 
		}
	};
	
	// when user clicks generate schedule -> send data to the backend
	const handleGenerateSchedule = async () => {
        if (!startDate || !eventName) {
            window.alert("Please enter subject name and start date before generating the schedule.");
            return;
        }

        try {
            const result = await createNewEvent(startDate, endDate, eventName, eventColour, [1,2,3]); // hard code the testIDs for now 
        } 
		catch (error) {
            console.error('Failed to generate schedule:', error.message || 'Error');
        }
    };

	// Function to handle date click and open modal
    const handleDateClick = (arg) => {
		const clickedDate = arg.dateStr;
		setSelectedDate(clickedDate);	
		const eventsOnDate = events.filter(event => event.start === clickedDate);
		setSelectedEvents(eventsOnDate);
		setIsOpen(true); // Open the modal
	};
	


	// for testing
	useEffect(() => {
		console.log(events);
	}, [events]);

	return (
		<div className='calendarContainer'> 
			<h3>Struggling to plan a revision schedule?</h3>
			<h1>Daddy's got your back!</h1>
			<div className='inputContainerforMaunual'>
				<div className='input'>Subject Name: <input type="text" placeholder="Enter Subject" value={eventName} onChange={(e) => setEventName(e.target.value)}/></div>
				<div className='input'>Start date: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
				<div className='input'>End date: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
				<div className='input'>Colour: <input type="color" value={eventColour} onChange={(e) => setEventColour(e.target.value)} /></div>
				<button onClick={handleGenerateSchedule}>Generate Schedule</button>
			</div>
			<div className='calendar'>
				<FullCalendar
					plugins={[dayGridPlugin,interactionPlugin]}
					initialView="dayGridMonth"
					events={events}
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
		</div>
	);
}

export default Calendar;



