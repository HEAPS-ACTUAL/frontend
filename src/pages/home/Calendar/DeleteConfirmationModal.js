import React from 'react';
import styles from '../../../styles/DayModal.module.css'; 

const DeleteConfirmationModal = ({ isOpen, onClose, onDeleteAll, onDeleteOne }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Delete Confirmation</h2>
                <p>Are you sure you want to delete all revision dates for this exam?</p>
                <button onClick={onDeleteAll}>Delete All Revision Dates</button>
                <button onClick={onDeleteOne}>Delete Just This Date</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
