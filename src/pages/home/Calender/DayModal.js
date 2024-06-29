import React, { useEffect, useState } from 'react';
import '../../../styles/DayModal.css'; 
import { FaCalendar } from "react-icons/fa";

function DayModal({ isOpen, onClose, date, events }) {
    const [formattedDate, setFormattedDate] = useState('');
    const [checkedEvents, setCheckedEvents] = useState({});

    // Format the date when component mounts or when date changes
    useEffect(() => {
        const formatted = new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        setFormattedDate(formatted);
    }, [date]);

    // Load checked events from localStorage on component mount
    useEffect(() => {
        const storedCheckedEvents = localStorage.getItem('checkedEvents');
        if (storedCheckedEvents) {
            setCheckedEvents(JSON.parse(storedCheckedEvents));
        }
    }, []);

    // Update localStorage whenever checkedEvents change
    useEffect(() => {
        localStorage.setItem('checkedEvents', JSON.stringify(checkedEvents));
    }, [checkedEvents]);

    if (!isOpen) return null;

    const handleCheckboxChange = (eventId) => {
        setCheckedEvents(prevState => ({
            ...prevState,
            [eventId]: !prevState[eventId]
        }));
    };

    return (
        <div className="modalContainer">
            <div className="modalHeader">
                <div><FaCalendar style={{color: '#57788b'}} /> Today's Events</div>
                <button className="closeButton" onClick={onClose}>X</button>
            </div>
            <div className="modalDate">{formattedDate}</div>
            <div className="modalEvents">
                <div className="eventsContainer">
                    {events.length === 0 ? (
                        <p className="noEventsMessage">-No Events Today-</p>
                    ) : (
                        events.map(event => (
                            <div key={event.id} className="eventItem" style={{ backgroundColor: event.color || '#57788b' }}>
                                <label className="checkboxContainer">
                                    <input
                                        type="checkbox"
                                        checked={checkedEvents[event.id]}
                                        onChange={() => handleCheckboxChange(event.id)}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <p>{event.title}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default DayModal;