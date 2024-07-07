import React, { useEffect, useState } from 'react';
import styles from '../../../styles/DayModal.module.css'; 
import { FaTrashCan } from "react-icons/fa6";
import postItIcon from '../../../images/post-it.png'

function DayModal({ date, events, onDeleteEvent }) {
    const [formattedDate, setFormattedDate] = useState('');

    // Format the date when component mounts or when date changes
    useEffect(() => {
        const formatted = new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        setFormattedDate(formatted);
    }, [date]);

    const handleDeleteButtonClick = (event) => {
        onDeleteEvent(event);
    }

    return (
        <div className={styles.modalContainer}>
            <img alt='picture-of-a-post-it' className={styles.postItIcon} src={postItIcon} />
            <div className={styles.modalContent}>
                
                <div className={styles.modalHeader}> 
                    Today's Events
                </div>

                <div className={styles.modalDate}>
                    <div> {formattedDate} </div>
                </div>

                <div className={`${styles.eventsContainer} ${events.length === 0 ? styles.noEvents : styles.haveEvents}`}>
                    {events.length === 0 
                        ? <p className={styles.noEventsMessage}>-No Events Today-</p> 
                        : events.map(event => (
                            <div key={event.id} className={styles.eventItem}>
                                <button className={styles.eventTitle}>
                                    <p>{event.title}</p>
                                </button>

                                <button className={styles.deleteButton} onClick={() => handleDeleteButtonClick(event)}>
                                    <FaTrashCan style={{ opacity: 0.5 }} />
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default DayModal;
