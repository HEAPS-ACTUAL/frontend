import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/FlashcardModal.module.css";

function FlashcardModal({ isOpen, flashcardsArray, onClose }) {
    const navigate = useNavigate();

    if (!isOpen){
        return null;
    }

    function handleTestClick(flashcardID) {
        navigate("/test/flashcard", { state: { testID: flashcardID } });
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Select a Flashcard</h2>
                
                <ul>
                    {flashcardsArray.map((flashcard) => (
                        <li key={flashcard['TestID']}>
                            <button className={styles.testButton} onClick={() => handleTestClick(flashcard['TestID'])} >
                                {flashcard['TestName']}
                            </button>
                        </li>
                    ))}
                </ul>

                <button className={styles.closeButton} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default FlashcardModal;
