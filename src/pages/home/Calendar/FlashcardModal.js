import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/FlashcardModal.module.css";

function FlashcardModal({ isOpen, tests, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleTestClick = (test) => {
    console.log("Test selected:", test.name);
    navigate("/flashcard", { state: { testID: test.id } });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Select a Flashcard</h2>
        <ul>
          {tests.map((test) => (
            <li key={test.id}>
              <button
                className={styles.testButton}
                onClick={() => handleTestClick(test)}
              >
                {test.name}
              </button>
            </li>
          ))}
        </ul>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default FlashcardModal;
