import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/DeleteConfirmationModal.module.css';
import { updateFlashcard } from '../../services/FlashcardService';

function ConfirmationModal({ isOpen, closeModal, event }) {
    console.log(event);
    const navigate = useNavigate();

    if (!isOpen){
        return null;
    }

    const testID = event.id[0];
    const updatedText = event.id[1];
    const isBack = event.title;
    
    // DELETE A SINGLE REVISION DATE
    const handleYes = async () => {
        const updateStatus = await updateFlashcard(testID, newUpdatedText, isFlipped);
        if (updateStatus === "Flashcard updated successfully"){
            setIsEditing(!isEditing);
            window.location.reload();
        }
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <h2>Save Changes</h2>
                <p>Are you sure?</p>
                <div className={styles.buttonGroup}>
                    <button onClick={handleYes}>Yes</button>
                    <button onClick={closeModal}>No</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
