import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/FlashcardModal.module.css";
import calendarImage from '../../images/calendar.png';
import { getFlashcardsByScheduleID } from "../../services/FlashcardService";

import { trackFollowedRevisionSchedule } from "../../services/PostHogAnalyticsServices";

function FlashcardModal({ isOpen, scheduleID, onClose }) {
    const navigate = useNavigate();

    const [flashcardsArray, setFlashcardsArray] = useState([]);

    useEffect(() => {
        async function fetchRelatedFlashcards(){
            const relatedFlashcards = await getFlashcardsByScheduleID(scheduleID);
            setFlashcardsArray(relatedFlashcards);
        }
        
        fetchRelatedFlashcards();
        
    }, [scheduleID])
    
    function handleTestClick(flashcardID) {
        let followedRevisionDate = window.prompt("Is today the revision date? [Y|N]");
        console.log(followedRevisionDate);
        while (followedRevisionDate !== "Y" && followedRevisionDate !== "N"){
            followedRevisionDate = window.prompt("Is today the revision date? [Y|N]");
        }
        trackFollowedRevisionSchedule(followedRevisionDate);
        navigate(`/test/flashcard/${flashcardID}`);
    }
    
    if (!isOpen) {
        return null;
    }
    
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <button className={styles.closeButton} onClick={onClose}>
                    <span title='close' className={styles.closeIcon}>X</span>
                </button>

                <h2>Select a Flashcard</h2>

                <ul>
                    {flashcardsArray.map((flashcard) => (
                        <li key={flashcard["TestID"]}>
                            <button title='view flashcard' className={styles.testButton} onClick={() => handleTestClick(flashcard["TestID"])} >
                                <div className={styles.buttonContent}>
                                    
                                    <span className={styles.testName}> {flashcard["TestName"]} </span>

                                    <br></br>

                                    <span className={styles.dateTime}>
                                        <img className={styles.calendarImage} src={calendarImage} alt="calendar" />
                                        {flashcard["DateTimeCreated"].slice(0,10)}
                                    </span>

                                </div>
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default FlashcardModal;
