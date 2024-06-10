import React from 'react';
import styles from '../../styles/Features.module.css';

function Features(){
    return(

        <div className={styles.Features}>
            <div className={styles.interactiveFlashcards}>
                <h2>Interactive Flashcards</h2>
            </div>

            <div className={styles.spacedRepetitionSchedule}>
                <h2>Customized Spaced Repetition Scheduling</h2>
            </div>

            <div className={styles.smartQuizPopups}>
                <h2>Smart Quiz Pop-Ups</h2>

            </div>

            
        </div>
       
    );
    
}

export default Features;
