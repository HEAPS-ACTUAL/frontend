import React, { useEffect, useState } from "react";
import styles from "../../../styles/DayModal.module.css";
import { FaTrashCan } from "react-icons/fa6";
import postItIcon from "../../../images/post-it.png";
import FlashcardModal from "./FlashcardModal";
import { getFlashcardsByScheduleID } from "../../../services (for backend)/FlashcardService";

function DayModal({ date, events, handleDeleteClicked }) {
    // Format the date when component mounts or when date changes
    const [formattedDate, setFormattedDate] = useState("");
    
    useEffect(() => {
        const formatted = new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        
        setFormattedDate(formatted);
        
    }, [date]);
    
    // For flashcard modal
    const [isFlashcardModalOpen, setFlashcardModalOpen] = useState(false);
    const [retrievedFlashcards, setRetrievedFlashcards] = useState([]);

    async function handleEventClick(scheduleID) {
        try {
            const flashcardsArray = await getFlashcardsByScheduleID(scheduleID);

            setRetrievedFlashcards(flashcardsArray);
            setFlashcardModalOpen(true);
        } 
        catch (error) {
            console.error("Failed to fetch tests:", error);
        }
    }

    return (
        <div className={styles.modalContainer}>
            <img alt="picture-of-a-post-it" className={styles.postItIcon} src={postItIcon} />

            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>Today's Events</div>
                <div className={styles.modalDate}>{formattedDate}</div>
                <div className={`${styles.eventsContainer} ${events.length === 0 ? styles.noEvents : styles.haveEvents}`} >
                    {events.map((event) => (
                        <div key={event.id} className={styles.eventItem}>

                            <button className={styles.eventTitle} onClick={() => handleEventClick(event.id[0])} >
                                {event.title}
                            </button>

                            <button onClick={() => handleDeleteClicked(event)} className={styles.deleteButton} >
                                <FaTrashCan style={{ opacity: 0.5 }} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <FlashcardModal
                isOpen={isFlashcardModalOpen}
                flashcardsArray={retrievedFlashcards}
                onClose={() => setFlashcardModalOpen(false)}
            />

        </div>
    );
}

export default DayModal;
