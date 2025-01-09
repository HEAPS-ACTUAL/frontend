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
import { getAllQuestionsAndOptionsFromATest } from '../../../services/TestService';
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
    const [unsureFlashcards, setUnsureFlashcards] = useState([])
    const [knowFlashcards, setKnowFlashcards] = useState([])
    
    const [isLoading, setIsLoading] = useState(true)
    const [index, setIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)

    const [trackProgress, setTrackProgress] = useState(true)

    useEffect(() => {

        async function fetchTestQuestions() {
            const flashcardQuestions = await getAllQuestionsAndOptionsFromATest(id);
            setFlashcardArray(flashcardQuestions);
            console.log(flashcardQuestions)
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
        if (index === flashcardArray.length - 1){
            navigate(`completed`, {state: {knowFlashcards, unsureFlashcards}})
        }
        else {
            setIndex(index + 1)
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
                        <div className={`${styles.textLarge} ${styles.textCenter}`}>Computational Thinking Week 3</div>
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

                    <div className={`${styles.flashcard} ${isFlipped ? styles.flashcardFlipped : styles.flashcardNormal}`} onClick={flipFlashcard}>
                        {isFlipped ? flashcardArray[index].Elaboration : flashcardArray[index].QuestionText}
                        <img src={flipIcon} className={styles.icon} />
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