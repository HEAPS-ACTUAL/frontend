import React from "react";
import styles from "../../../styles/Modal.module.css";

const Modal = ({ isOpen, content, onClose }) => {
  // Conditional rendering: Only render the Modal if 'isOpen' is true.
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      {" "}
      {/* Full-screen overlay that dims the background and centers the modal content */}
      <div className={styles.modal}>
        {" "}
        {}
        <button
          onClick={onClose} // Button to close the modal. Executes 'onClose' function passed as a prop.
          className={styles.closeButton}
        >
          ×{" "}
          {/* Visual representation of the close button using a multiplication symbol */}
        </button>
        {content}{" "}
        {/* Dynamic content passed to the modal, rendered inside the modal box */}
      </div>
    </div>
  );
};

export default Modal;
