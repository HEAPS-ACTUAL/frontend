import React from "react";
import styles from '../styles/CompletedFlashcard.module.css'
import ProgressRing from "../components/ProgressRing";
import Confetti from "../components/Confetti";

function CompletedFlashcardPage() {
    
    return (
        <div className={styles.container}>
            <Confetti /> 

            <div className={styles.header}>
                <h3> Congratulations!! You have completed </h3>
                <p style={{fontWeight: 'normal'}}> Computational Thinking Week 3 </p>
            </div>

            <div className={styles.progressContainer}>
                <p style={{color: 'grey', fontWeight: 'bold'}}> Your progress... </p>
                <div className={styles.progress}>
                    <div style={{width: '150px', height: '150px'}}>
                        <ProgressRing />
                    </div>
                    <div>
                        <p className={styles.remembered}> Remembered: <a style={{fontWeight: '600'}}> 13 </a> </p>
                        <p className={styles.unsure}> Unsure: <a style={{fontWeight: '600'}}> 6 </a> </p>
                    </div>
                </div>
            </div>

            <div className={styles.buttonsContainer}>
                <button> Restart Flashcards </button>
                <button> Review Unsure Flashcards </button>
            </div>
        </div>
    )
}

export default CompletedFlashcardPage