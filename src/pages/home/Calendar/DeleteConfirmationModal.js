import React from 'react';
import styles from '../../../styles/DeleteConfirmationModal.module.css';

function DeleteConfirmationModal({ isOpen, onClose, onDeleteAll, onDeleteOne, event }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <h2>Delete Event</h2>
                <p>Do you want to delete all revision dates or just one?</p>
                <div className={styles.buttonGroup}>
                    <button onClick={onDeleteAll}>Delete All</button>
                    <button onClick={onDeleteOne}>Delete One</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;
