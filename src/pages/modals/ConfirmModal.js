import React from "react";
import styles from "../../styles/ConfirmModal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { updateFlashcard } from '../../services/FlashcardService';


const ConfirmModal = ({ setIsOpen, testID, newUpdatedText, isBack }) => {
    const navigate = useNavigate();

    const handleConfirm = async () => {
        const updateStatus = await updateFlashcard(testID, newUpdatedText, isBack);
        if (updateStatus === 'Flashcard updated successfully') { // message from the backend
            navigate(
                '../../../loading-page', 
                {state: 
                    {
                        duration: 1500, 
                        messageArray: [`Updating Flashcard...`], 
                        redirect: `/home/test/flashcard?testID=${testID}`,
                    } 
                }
            )
        } 
        else { 
            window.alert('Failed to update the flashcard, try again'); 
        }
    }

    return (
        <>
            <div className={styles.darkBG} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Update Flashcard</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className={styles.modalContent}>
                        Are you sure?
                    </div>
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                        <button
                                className={styles.noBtn}
                                onClick={() => setIsOpen(false)}
                            >
                                No
                            </button>
                            <button className={styles.yesBtn} onClick={handleConfirm}>
                                Yes
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ConfirmModal;