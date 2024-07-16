import React from 'react';
import styles from '../../../styles/DeleteConfirmationModal.module.css';

import { DeleteExistingExam, DeleteSpecificRevisionDate } from '../../../services/ScheduleService';

function DeleteConfirmationModal({ isOpen, closeModal, event }) {
    if (!isOpen){
        return null;
    }

    const scheduleID = event.id[0];
    const date = event.id[1];
    const examName = event.title;

    // DELETE ENTIRE SCHEDULE
    async function handleDeleteAll(){
        console.log("trying to delete entire schedule for exam with schedule ID:", scheduleID);

        const result = await DeleteExistingExam(scheduleID);

        if (result === 'ok deleted entire exam from db') { // message from the backend
            window.alert(`${examName} deleted successfully!`);
            window.location.reload();
        } 
        else { 
            window.alert('Failed to delete the exam, try again'); 
        }

        // setIsDeleteModalOpen(false); // close the delete confirmation modal
    }
    
    // DELETE A SINGLE REVISION DATE
    async function handleDeleteOne(){
        const result = await DeleteSpecificRevisionDate(scheduleID, date); 
        
        if (result === 'ok deleted specific date from db') {
            window.alert(`Revision date deleted successfully!`);
            window.location.reload();
        } 
        else {
            window.alert('Failed to delete revision date, try again');
        }
    };

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <h2>Delete Event</h2>
                <p>Do you want to delete all revision dates or just one?</p>
                <div className={styles.buttonGroup}>
                    <button onClick={handleDeleteAll}>Delete All</button>
                    <button onClick={handleDeleteOne}>Delete One</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;
