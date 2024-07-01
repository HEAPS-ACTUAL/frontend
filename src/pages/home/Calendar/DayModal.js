import React, { useEffect, useState } from 'react';
import styles from '../../../styles/DayModal.module.css'; 
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
        <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
                <div><FaCalendar style={{color: '#57788b'}} /> Today's Events</div>
                <button className={styles.closeButton} onClick={onClose}>X</button>
            </div>
            <div className={styles.modalDate}>{formattedDate}</div>
            <div className={styles.modalEvents}>
                <div className={styles.eventsContainer}>
                    {events.length === 0 ? (
                        <p className={styles.noEventsMessage}>-No Events Today-</p>
                    ) : (
                        events.map(event => (
                            <div key={event.id} className={styles.eventItem} style={{ backgroundColor: event.color || '#57788b' }}>
                                <label className={styles.eventLabel} htmlFor={`checkbox-${event.id}`}>
                                    <input
                                        id={`checkbox-${event.id}`}
                                        type="checkbox"
                                        checked={checkedEvents[event.id]}
                                        onChange={() => handleCheckboxChange(event.id)}
                                    />
                                    <span className={styles.customCheckbox}></span>
                                    <p>{event.title}</p>
                                </label>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default DayModal;
