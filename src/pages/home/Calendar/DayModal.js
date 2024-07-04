import React, { useEffect, useState } from 'react';
import styles from '../../../styles/DayModal.module.css'; 
import calendarIcon from '../../../images/todaysEvents.png'
import { FaCalendar } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import postItIcon from '../../../images/post-it.png'

function DayModal({ date, events, onDeleteEvent }) {
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

    const handleCheckboxChange = (eventId) => {
        setCheckedEvents(prevState => ({
            ...prevState,
            [eventId]: !prevState[eventId]
        }));
    };

    const handleDeleteButtonClick = (event) => {
        onDeleteEvent(event); // 
    }

    return (
        <div className={styles.modalContainer}>
            <img className={styles.postItIcon} src={postItIcon} />
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}> Today's Events </div>
                <div className={styles.modalDate}>
                    <img className={styles.calendarIcon} src={calendarIcon} />
                    <div> {formattedDate} </div>
                </div>
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
                                    <button className={styles.deleteButton} onClick={() => handleDeleteButtonClick(event)}>
                                        <FaTrashCan style={{ opacity: 0.5 }} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DayModal;
