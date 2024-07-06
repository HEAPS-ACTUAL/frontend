import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../styles/Flashcard.module.css';
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

// Import functions
import { getAllQuestionsAndOptionsFromATest } from '../../../services (for backend)/TestService';


const Flashcard = () => {
    const location = useLocation();
    const {testID} = (location.state); // retrieve testID from Flashcard page
    const [flashcardArray, setFlashcardArray] = useState([]);
    const [CurrentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
    const navigate = useNavigate();
    const [isFlipped, setIsFlipped] = useState(false);
    const [canRememberCount, setCanRememberCount] = useState(0);
    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    }

    useEffect(() => {
        
        async function fetchTestQuestions(){
            const flashcardQuestions = await getAllQuestionsAndOptionsFromATest(testID);
            setFlashcardArray(flashcardQuestions);
            
        }
        fetchTestQuestions();
    }, [])

    // control navigation through the array of flashcards
    const handleNextFlashcard = () => {

        if(CurrentFlashcardIndex < flashcardArray.length -1){
            setCurrentFlashcardIndex(CurrentFlashcardIndex + 1)
            setIsFlipped(false);
        }
        
        else{
            navigate('/FlashcardsResultsPage', {state: {testID, canRememberCount}}) // pass in the percentage of correct attempts
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

    if (flashcardArray.length === 0) {
        return <div>Loading...</div>; // Display a loading state while questions are being fetched
        // without this, the page will show error as the flashcardArray will be undefined while awaiting
    }

    return(
        <div className={styles.wrapper} >

            <div onClick={toggleFlip} className={`${styles.FlashcardContainer} ${isFlipped ? styles.isFlipped: '' }`}>

                    <div className={styles.FlashcardFace + " " + styles.FrontFlashcardContent}>
                        {flashcardArray[CurrentFlashcardIndex]["QuestionText"]}
                    </div>

                    <div className={styles.FlashcardFace + " " + styles.BackFlashcardContent}>
                        {flashcardArray[CurrentFlashcardIndex]["Elaboration"]}
                    </div>

                    

            </div>

            

            <div className={styles.buttons}>

                <button className={styles.previousBtn} onClick={handlePreviousFlashcard}>
                    <BsArrowLeftShort />
                </button>

                <button className={styles.HomeButton} onClick={() => navigate('/Home')}>Back to Home</button>

                <button 
                    className={styles.nextBtn} 
                    onClick={handleNextFlashcard}
                    disabled={CurrentFlashcardIndex === flashcardArray.length - 1} 
                >
                    <BsArrowRightShort />
                </button>

            </div>

            <div className={styles.counter}>     
                {flashcardArray[CurrentFlashcardIndex]["QuestionNo"]} of {flashcardArray.length}
            </div>
        </div>
    )

}

export default Flashcard;