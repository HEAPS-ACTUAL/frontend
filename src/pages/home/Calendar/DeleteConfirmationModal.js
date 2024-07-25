import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/DeleteConfirmationModal.module.css';

import { deleteExistingExam, deleteSpecificRevisionDate } from '../../../services/ScheduleService';


function DeleteConfirmationModal({ isOpen, closeModal, event }) {

    const navigate = useNavigate();

    if (!isOpen){
        return null;
    }

    const scheduleID = event.id[0];
    const date = event.id[1];
    const examName = event.title;

    // DELETE ENTIRE SCHEDULE
    async function handleDeleteAll(){
        const result = await deleteExistingExam(scheduleID);

        if (result === 'ok deleted entire exam from db') { // message from the backend
            navigate(
                '../../../loading-page', 
                {state: 
                    {
                        duration: 1500, 
                        messageArray: [`Deleting exam...`], 
                        redirect: '/home/revision-schedule'
                    } 
                }
            )
        } 
        else { 
            window.alert('Failed to delete the exam, try again'); 
        }
    }
    
    // DELETE A SINGLE REVISION DATE
    async function handleDeleteOne(){
        const result = await deleteSpecificRevisionDate(scheduleID, date); 
        
        if (result === 'ok deleted specific date from db') {
            navigate(
                '../../../loading-page', 
                {state: 
                    {
                        duration: 1500, 
                        messageArray: [`Deleting revision date...`], 
                        redirect: '/home/revision-schedule'
                    } 
                }
            )
        }
        else {
            window.alert('Failed to delete revision date, try again');
        }
    };

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <h2>Delete Event</h2>
                <p>Do you want to delete all revision dates or just the selected date?</p>
                <div className={styles.buttonGroup}>
                    <button onClick={handleDeleteAll} >Delete All</button>
                    <button onClick={handleDeleteOne}>Delete Selected Date</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;
