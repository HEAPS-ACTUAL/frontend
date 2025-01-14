import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from '../../../styles/Flashcard.module.css';

//icons
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import flipIcon from '../../../images/flip (1).png';

// Import functions
import { getAllQuestionsAndOptionsFromATest, getTestName } from '../../../services/TestService';
// import { trackFlashcardUsage } from '../../../services/PostHogAnalyticsServices';
// import ConfirmModal from '../../modals/ConfirmModal';

// Components
import Spinner from '../../../components/Spinner';
import ToggleSwitch from '../../../components/ToggleSwitch';

const Flashcard = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const location = useLocation();
    // const { knowFlashcardsArray = [], unsureFlashcardsArray = [] } = location.state || {};

    const [flashcardArray, setFlashcardArray] = useState([])
    const [flashcardName, setFlashcardName] = useState([])
    const [unsureFlashcards, setUnsureFlashcards] = useState([])
    const [knowFlashcards, setKnowFlashcards] = useState([])
    
    const [isLoading, setIsLoading] = useState(true)
    const [index, setIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)

    const [trackProgress, setTrackProgress] = useState(false)

    // 1) Extra local states
    const [animOut, setAnimOut] = useState(false);
    const [animIn, setAnimIn] = useState(false);

    useEffect(() => {

        async function fetchTestQuestions() {
            const flashcardQuestions = await getAllQuestionsAndOptionsFromATest(id);
            setFlashcardArray(flashcardQuestions);
            console.log(flashcardQuestions)

            const flashcardName = await getTestName(id)
            setFlashcardName(flashcardName.testName)

            setIsLoading(false)
        }
        
        fetchTestQuestions();

    }, [id])

    useEffect(() => {
        updateProgress()
    }, [flashcardArray, index])

    function updateProgress(){
        let newProgress = (index + 1) / flashcardArray.length * 100
        setProgress(newProgress)
    }

    function previousFlashcard(){
        setIndex(index - 1)
    }
    
    function nextFlashcard(){
        // if (index === flashcardArray.length - 1){
        //     navigate(`completed`, {state: {knowFlashcards, unsureFlashcards}})
        // }
        // else {
        //     setIndex(index + 1)
        // }

        setAnimOut(true);
    }

    function handleAnimationEnd() {
        if (animOut) {
          // Done discarding => increment index
          setIndex((prev) => prev + 1);
          setAnimOut(false);
      
          // Animate new card in
          setAnimIn(true);
        } else if (animIn) {
          // Done entering => reset
          setAnimIn(false);
        }
    }
  
    function handleLeftArrowClicked(){
        previousFlashcard()
    }

    function handleRightArrowClicked(){
        nextFlashcard()
    }

    function handleTickClicked(){
        setKnowFlashcards([...knowFlashcards, flashcardArray[index]])
        nextFlashcard()
    }

    function handleCrossClicked(){
        setUnsureFlashcards([...unsureFlashcards, flashcardArray[index]])
        nextFlashcard()
    }

    function flipFlashcard(){
        setIsFlipped(!isFlipped)
    }

    function toggleTrackProgress(){
        setTrackProgress(!trackProgress)

        if (trackProgress){
            setKnowFlashcards([])
            setUnsureFlashcards([])
        }
        else {
            setIndex(0)
        }
    }

    return (
        <div>
            {isLoading ? (
                <Spinner message={'loading flashcard...'} />
            ) : (
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <div className={`${styles.textLarge} ${styles.textCenter}`}> {flashcardName} </div>
                        <button className={styles.button} onClick={() => navigate(`edit`)}>
                            <FiEdit />
                        </button>
                    </div>

                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: progress + '%' }}
                            ></div>
                        </div>
                        <div className={`${styles.textCenter} ${styles.textSmall}`}>
                            {index + 1} of {flashcardArray.length}
                        </div>
                    </div>

                    {trackProgress && (
                        <div className={styles.flex}>
                            <div className={styles.flex}>
                                <div className={`${styles.scoreCount} ${styles.unsureCount} ${styles.textRed}`}>{unsureFlashcards.length}</div>
                                <p className={styles.textRed}> Unsure </p>
                            </div>

                            <div className={styles.flex}>
                                <p className={styles.textGreen}> Remember </p>
                                <div className={`${styles.scoreCount} ${styles.sureCount} ${styles.textGreen}`}>{knowFlashcards.length}</div>
                            </div>
                        </div>
                    )}

                    
                    <div
                    onClick={flipFlashcard}
                    className={`
                        ${styles.flashcardContainer}
                        ${animOut ? styles.fadeOutLeft : ''}
                        ${animIn ? styles.fadeInRight : ''}
                    `}
                    onAnimationEnd={handleAnimationEnd}
                    >
                    <div className={`${styles.flashcardInner} ${isFlipped ? styles.flipped : ''}`}>
                        
                        {/* FRONT FACE */}
                        <div className={styles.flashcardFront}>
                        {flashcardArray[index]?.QuestionText}
                        <img src={flipIcon} className={styles.icon} />
                        </div>

                        {/* BACK FACE */}
                        <div className={styles.flashcardBack}>
                        {flashcardArray[index]?.Elaboration}
                        <img src={flipIcon} className={styles.icon} />
                        </div>

                    </div>
                    </div>


                    {trackProgress ? (
                        <div className={styles.flexCenter}>

                            <div className={styles.toggleSwitch}>
                                <ToggleSwitch trackProgress={trackProgress} handleToggle={toggleTrackProgress}/>
                            </div>

                            <button className={`${styles.circleButton}`} onClick={handleCrossClicked}>
                                <RxCross2 className={`${styles.textRed} ${styles.cross}`} />
                            </button>

                            <button className={`${styles.circleButton}`} onClick={handleTickClicked}>
                                <BsCheckLg className={`${styles.textGreen} ${styles.tick}`} />
                            </button>

                        </div>
                    ) : (
                        <div className={styles.flexCenter}>

                            <div className={styles.toggleSwitch}>
                                <ToggleSwitch trackProgress={trackProgress} handleToggle={toggleTrackProgress}/>
                            </div>

                            <button className={`${styles.circleButton} ${index === 0 && styles.circleButtonDisabled}`} onClick={handleLeftArrowClicked} disabled={index === 0}>
                                <BsArrowLeftShort />
                            </button>

                            <button className={`${styles.circleButton} ${index === flashcardArray.length - 1 && styles.circleButtonDisabled}`} onClick={handleRightArrowClicked} disabled={index === flashcardArray.length - 1}>
                                <BsArrowRightShort />
                            </button>

                        </div>
                    )}

                </div>
            )}
        </div>
    );
}

export default Flashcard;