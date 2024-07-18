import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../styles/Flashcard.module.css';

//icons
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { GrSchedules } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { BsArrowRepeat } from "react-icons/bs";
// import flipIcon from '../../../images/flip icon.png';
import flipIcon from '../../../images/flip (1).png';


// Import functions
import { getAllQuestionsAndOptionsFromATest } from '../../../services/TestService';



const Flashcard = () => {
    const location = useLocation();
    const {testID} = (location.state); // retrieve testID from Flashcard page
    
    const [flashcardArray, setFlashcardArray] = useState([]);
    const [CurrentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
    
    const navigate = useNavigate();
    
    const [isFlipped, setIsFlipped] = useState(false);
    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    }

    useEffect(() => {
        
        async function fetchTestQuestions(){
            const flashcardQuestions = await getAllQuestionsAndOptionsFromATest(testID);
            setFlashcardArray(flashcardQuestions);
            
        }
        fetchTestQuestions();
    }, [testID])

    // control navigation through the array of flashcards
    const handleNextFlashcard = () => {

        if(CurrentFlashcardIndex < flashcardArray.length -1){
            setCurrentFlashcardIndex(CurrentFlashcardIndex + 1)
            setIsFlipped(false);
        }
    }

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
        <div className={styles.wrapper}>
            
            <div onClick={toggleFlip} className={`${styles.FlashcardContainer} ${isFlipped ? styles.isFlipped : ''}`}>
                <div className={styles.FlashcardFace + " " + styles.FrontFlashcardContent}>
                    {flashcardArray[CurrentFlashcardIndex]["QuestionText"]}
                    {/*<div className={styles.flipArrow}><BsArrowRepeat /></div> */}
                </div>

                <div className={styles.FlashcardFace + " " + styles.BackFlashcardContent}>
                    {flashcardArray[CurrentFlashcardIndex]["Elaboration"]}
                    {/*<div className={styles.flipArrow}><BsArrowRepeat /></div> */}
                </div>
                <img src={flipIcon} title='flip flashcard' className={`${!isFlipped ? styles.flipIconFront : styles.flipIconBack}`} /> 
            </div>


            <div className={styles.buttons}>
                <button title='previous flashcard' className={styles.previousBtn} onClick={handlePreviousFlashcard} disabled={CurrentFlashcardIndex === 0}> <BsArrowLeftShort /></button>
                <button title='revision schedule' className={styles.RevisionScheduleButton} onClick={() => navigate('/home/revision-schedule')}><GrSchedules /></button>
                <button title='home' className={styles.HomeButton} onClick={() => navigate('/home')}><FaHome /></button>
                <button title='next flashcard' className={styles.nextBtn} onClick={handleNextFlashcard} disabled={CurrentFlashcardIndex === flashcardArray.length - 1} ><BsArrowRightShort /></button>

            </div>

            <div className={styles.counter}>     
                {flashcardArray[CurrentFlashcardIndex]["QuestionNo"]} of {flashcardArray.length}
            </div>
        </div>
    )

}

export default Flashcard;