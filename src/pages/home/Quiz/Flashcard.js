import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../styles/Flashcard.module.css';
import { BsArrowLeftShort } from "react-icons/bs";

const Flashcard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const flashcardArray = [
        {  
            "id": 1,
            "question": 'What is the capital of France?',
            "answer": 'Paris'
        },

        {
            "id": 2,
            "question": 'What is the capital of switzerland?',
            "answer": 'bern'
        },
        {
            "id": 3,
            "question": 'What is the capital of italy?',
            "answer": 'rome'
        }
    ]

    const [CurrentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [canRememberCount, setCanRememberCount] = useState(0);

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    }

    // control navigation through the array of flashcards
    const handleNextFlashcard = () => {

        if(CurrentFlashcardIndex < flashcardArray.length -1){
            setCurrentFlashcardIndex(CurrentFlashcardIndex + 1)
            setIsFlipped(false);
        }
        
        else{
            navigate('/FlashcardsResultsPage', {state: {}}) // pass in the percentage of correct attempts
        }

    }

    const handleCanRemember = () => {
        setCanRememberCount(canRememberCount + 1);
        handleNextFlashcard(); // Move to the next card 
    };

    const handlePreviousFlashcard = () =>{
        if(CurrentFlashcardIndex > 0){
            
            setCurrentFlashcardIndex(CurrentFlashcardIndex - 1);
            setIsFlipped(false); 
        }
    }
    return(
        <div className={styles.wrapper} >

            <div onClick={toggleFlip} className={`${styles.FlashcardContainer} ${isFlipped ? styles.isFlipped: '' }`}>

                    <div className={styles.FlashcardFace + " " + styles.FrontFlashcardContent}>
                        {flashcardArray[CurrentFlashcardIndex].question}
                    </div>

                    <div className={styles.FlashcardFace + " " + styles.BackFlashcardContent}>
                        {flashcardArray[CurrentFlashcardIndex].answer}
                    </div>

                    

            </div>

            

            <div className={styles.buttons}>

                <button className={styles.previousBtn} onClick={handlePreviousFlashcard}>
                    <BsArrowLeftShort />
                </button>

                <button className={styles.crossBtn} onClick={handleNextFlashcard}>
                    cannot remember
                </button>

                <button className={styles.tickBtn} onClick={handleCanRemember}>
                    can remember
                </button>
            </div>

            <div className={styles.counter}>     
                {flashcardArray[CurrentFlashcardIndex]['id']} of {flashcardArray.length}
            </div>
        </div>
    )

}

export default Flashcard;





