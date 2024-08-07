import React, { useEffect, useState } from "react";
import styles from "../../styles/DayModal.module.css";
import { FaTrashCan } from "react-icons/fa6";
import postItIcon from "../../images/post-it.png";

function DayModal({ date, events, handleEventClick, handleDeleteClicked }) {
    const [formattedDate, setFormattedDate] = useState("");
    
    // Format the date when component mounts or when date changes
    useEffect(() => {
        const formatted = new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        
        setFormattedDate(formatted);
        
    }, [date]);

    return (
        <div className={styles.modalContainer}>
            <img alt="picture-of-a-post-it" className={styles.postItIcon} src={postItIcon} />

            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>Today's Events</div>
                <div className={styles.modalDate}>{formattedDate}</div>
                <div className={`${styles.eventsContainer} ${events.length === 0 ? styles.noEvents : styles.haveEvents}`} >
                    {events.length !== 0 
                        ? events.map((event) => (
                            <div title='see related flashcards' key={event.id} className={styles.eventItem}>

                                <button className={styles.eventTitle} onClick={() => handleEventClick(event.id[0])} >
                                    {event.title}
                                </button>

                                <button title='delete' onClick={() => handleDeleteClicked(event)} className={styles.deleteButton} >
                                    <FaTrashCan style={{ opacity: 0.5 }} />
                                </button>
                            </div>
                        ))
                        : <div> -- No events today -- </div>
                }
                </div>
            </div>
        </div>
    );
}

export default DayModal;
