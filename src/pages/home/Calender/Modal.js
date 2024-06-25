import React from "react";
import styles from "../../../styles/Modal.module.css"; // Create and import your own styles

const Modal = ({ isOpen, content, onClose }) => {
  console.log("Modal isOpen:", isOpen); // Add this to check if modal is receiving 'true'

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          ×
        </button>
        {content}
      </div>
    </div>
  );
};

export default Modal;
