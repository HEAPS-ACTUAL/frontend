import React from 'react';
import styles from '../styles/flashcard.module.css'; 

function Flashcards(){

    return(
        <div className={styles.flashcardContainer}>
            <div className={styles.flashcard}>
                <div className={styles.question}>
                    who in your family is gay?
                </div>

                <div className={styles.options}>
                    <div className='optionBox'>mother</div>
                    <div className='optionBox'>father</div>
                    <div className='optionBox'>sister</div>
                    <div className='optionBox'>brother</div>

                </div>
            </div>
        </div>
    );
}

export default Flashcards;