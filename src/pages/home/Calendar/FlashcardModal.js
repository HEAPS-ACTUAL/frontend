import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/FlashcardModal.module.css";
import calendarImage from '../../../images/calendar.png';

function FlashcardModal({ isOpen, flashcardsArray, onClose }) {
    const navigate = useNavigate();

    if (!isOpen) {
        return null;
    }

    function handleTestClick(flashcardID) {
        navigate("/test/flashcard", { state: { testID: flashcardID } });
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <button className={styles.closeButton} onClick={onClose}>
                    <span className={styles.closeIcon}>X</span>
                </button>

                <h2>Select a Flashcard</h2>

                <ul>
                    {flashcardsArray.map((flashcard) => (
                        <li key={flashcard["TestID"]}>
                            <button className={styles.testButton} onClick={() => handleTestClick(flashcard["TestID"])} >
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
