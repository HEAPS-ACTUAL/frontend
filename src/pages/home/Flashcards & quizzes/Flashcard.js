import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../styles/Flashcard.module.css';

//icons
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { GrSchedules } from "react-icons/gr";
import { FaHome, FaEdit } from "react-icons/fa";
import flipIcon from '../../../images/flip (1).png';

// Import functions
import { getAllQuestionsAndOptionsFromATest } from '../../../services/TestService';

const Flashcard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {testID} = (location.state); // retrieve testID from Flashcard page
    
    const [flashcardArray, setFlashcardArray] = useState([]);
    const [CurrentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
    
    const [isFlipped, setIsFlipped] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

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
    
    useEffect(() => {

        if (isDisabled){
            const handleKeyDown = null;
        } else{
            const handleKeyDown = (event) => {
                if (event.code === 'ArrowLeft') {
                    handlePreviousFlashcard();
                } 
                else if (event.code === 'ArrowRight') {
                    handleNextFlashcard();
                }
                else if (event.code === 'Space') {
                    event.preventDefault();
                    toggleFlip();
                }
            };
        
            window.addEventListener('keydown', handleKeyDown);
        
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    })

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

    const handleEditFlashcard = () => {
        setIsEditing(!isEditing);
        setIsDisabled(!isDisabled);
    }
    const disableFlip = () => {
        return;
    }

    const handleTextUpdate = () => {

    }

    if (flashcardArray.length === 0) {
        return <div>Loading...</div>; // Display a loading state while questions are being fetched
        // without this, the page will show error as the flashcardArray will be undefined while awaiting
    }

    return(
        <div className={styles.wrapper}>
            
            <div onClick={isDisabled ? disableFlip : toggleFlip} className={`${styles.FlashcardContainer} ${isFlipped ? styles.isFlipped : ''}`}>
                <div className={styles.FlashcardFace + " " + styles.FrontFlashcardContent}>
                    { isEditing ? <textarea placeholder={`${flashcardArray[CurrentFlashcardIndex]["QuestionText"]}`} id='editTextBox' name='updatedText'/> : flashcardArray[CurrentFlashcardIndex]["QuestionText"]}
                </div>
                <div>
                    <button title='cancelEdit' onClick={handleEditFlashcard} className={isEditing ? styles.cancelBtn : styles.cancelBtnHidden }>Cancel</button>
                    <button title='confirmEdit' onClick={handleTextUpdate} className={ `${isEditing ? styles.confirmBtn : styles.confirmBtnHidden} ${isFlipped ? styles.isFlipped : ''}` }>Confirm</button>
                </div>

                <div className={styles.FlashcardFace + " " + styles.BackFlashcardContent}>
                { isEditing ? <textarea placeholder={`${flashcardArray[CurrentFlashcardIndex]["Elaboration"]}`} id='editTextBox' name='updatedText'/> : flashcardArray[CurrentFlashcardIndex]["Elaboration"]}
                </div>
                <img src={flipIcon} alt='flip flashcard icon' title='flip flashcard' className={`${!isFlipped ? styles.flipIconFront : styles.flipIconBack}`} /> 
            </div>

            <div className={styles.buttons}>
                <button title='previous flashcard' className={styles.previousBtn} onClick={handlePreviousFlashcard} disabled={CurrentFlashcardIndex === 0}> <BsArrowLeftShort /></button>
                <button title='revision schedule' className={styles.RevisionScheduleButton} onClick={() => navigate('/home/revision-schedule')}><GrSchedules /></button>
                <button title='home' className={styles.HomeButton} onClick={() => navigate('/home')}><FaHome /></button>
                <button title='edit' className={styles.EditButton} onClick={handleEditFlashcard} ><FaEdit /></button>
                
                <button title='next flashcard' className={styles.nextBtn} onClick={handleNextFlashcard} disabled={CurrentFlashcardIndex === flashcardArray.length - 1} ><BsArrowRightShort /></button>

            </div>

            <div className={styles.counter}>     
                {flashcardArray[CurrentFlashcardIndex]["QuestionNo"]} of {flashcardArray.length}
            </div>
        </div>
    )
}

export default Flashcard;