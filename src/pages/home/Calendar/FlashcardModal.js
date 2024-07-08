import React from "react";
import styles from "../../../styles/FlashcardModal.module.css"; // Ensure to create this CSS module

function FlashcardModal({ isOpen, flashcards, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Select a Flashcard</h2>
        <ul>
          {flashcards.map((flashcard) => (
            <li key={flashcard.id}>{flashcard.question}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default FlashcardModal;
