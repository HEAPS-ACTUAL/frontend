import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../styles/Flashcard.module.css';

//icons
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { GrSchedules } from "react-icons/gr";
import { FaHome} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import flipIcon from '../../../images/flip (1).png';

// Import functions
import { getAllQuestionsAndOptionsFromATest } from '../../../services/TestService';
import { trackFlashcardUsage } from '../../../services/PostHogAnalyticsServices';
import ConfirmModal from '../../modals/ConfirmModal';

// Components
import Spinner from '../../../components/Spinner';
import Confetti from '../../../components/Confetti';

const Flashcard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { testID } = (location.state); // retrieve testID from Flashcard page

    const [flashcardArray, setFlashcardArray] = useState([])
    const [unsureFlashcards, setUnsureFlashcards] = useState([])
    const [knowFlashcards, setKnowFlashcards] = useState([])
    
    const [isLoading, setIsLoading] = useState(true)
    const [index, setIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)

    const [trackProgress, setTrackProgress] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {

        async function fetchTestQuestions() {
            const flashcardQuestions = await getAllQuestionsAndOptionsFromATest(testID);
            console.log(flashcardQuestions)
            setFlashcardArray(flashcardQuestions);
            setIsLoading(false)
        }
        
        fetchTestQuestions();

    }, [testID])

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
        setIndex(index + 1)
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
    }

    return (
        <div>

            {/* {showConfetti && <Confetti />} */}
            {isLoading ? (
                <Spinner message={'loading flashcard...'}/>
            ) : (
                <div className="container mx-auto mt-10 px-48 space-y-7">
                    <div className="relative">
                        <div className="text-xl text-center"> Computational Thinking Week 3 </div>
                        <button className="text-xl text-center w-min absolute top-1 right-0"> <FiEdit /> </button>
                    </div>
    
                    <div className="space-y-3">
                        <div className="h-3 bg-white rounded-full">
                            <div className="h-3 bg-green-500 rounded-full transition-all duration-500 ease-in-out" style={{ width: progress + "%" }}> </div>
                        </div>
                        <div className="text-center text-sm"> {index + 1} of {flashcardArray.length} </div>
                    </div>

                    {trackProgress && 
                        (<div className='flex justify-between'>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-red-200 text-red-500 border border-red-500 font-bold w-11 h-7 text-center content-center'> {unsureFlashcards.length} </div>
                                <p className='content-center text-center text-red-500 font-bold'> Unsure </p>
                            </div>
    
                            <div className='flex space-x-2'>
                                <p className='content-center text-center text-green-500 font-bold'> Remember </p>
                                <div className='rounded-full bg-green-200 text-green-500 border border-green-500 font-bold w-11 h-7 text-center content-center'> {knowFlashcards.length} </div>
                            </div>
                        </div>)
                    }
    
                    <div className={`bg-white rounded-2xl content-center text-3xl px-20 relative cursor-pointer ${isFlipped ? 'text-justify' : 'font-bold text-center'}`} style={{ height: "450px" }} onClick={flipFlashcard}>
                        {isFlipped ? flashcardArray[index].Elaboration : flashcardArray[index].QuestionText}
                        <img src={flipIcon} className="absolute w-6 h-6 top-5 right-5 hover:cursor-pointer"/>
                    </div>
    
                    <div className='relative'>
                        {trackProgress ? (
                            <div className="flex justify-center space-x-6">
                                <button className="bg-white rounded-full w-11 h-11 p-1 hover:bg-gray-200" onClick={handleCrossClicked}>
                                    <RxCross2 className="mx-auto text-2xl text-red-500" />
                                </button>
                                <button className="bg-white rounded-full w-11 h-11 p-1 hover:bg-gray-200">
                                    <BsCheckLg className="mx-auto text-2xl text-green-500" onClick={handleTickClicked}/>
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center space-x-6">
                                <button className="bg-white rounded-full p-1 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-200" onClick={handleLeftArrowClicked} disabled={index === 0}>
                                    <BsArrowLeftShort className="mx-auto text-4xl"/>
                                </button>
                                <button className="bg-white rounded-full w-11 h-11 p-1 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-200" onClick={handleRightArrowClicked} disabled={index === flashcardArray.length - 1}>
                                    <BsArrowRightShort className="mx-auto text-4xl" />
                                </button>
                            </div>
                        )}

                        <label className="inline-flex items-center cursor-pointer absolute top-0">
                            <input type="checkbox" className="sr-only peer" onClick={toggleTrackProgress} />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"> Track Progress </span>
                        </label>

                    </div>
                </div>
            )}

        </div>
    )

    // const location = useLocation();
    // const navigate = useNavigate();
    // const { testID } = (location.state); // retrieve testID from Flashcard page

    // const [flashcardArray, setFlashcardArray] = useState([]);
    // const [CurrentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

    // const [isFlipped, setIsFlipped] = useState(false);
    // const [isEditing, setIsEditing] = useState(false);
    // const [isDisabled, setIsDisabled] = useState(false);
    // const [newUpdatedText, setNewUpdatedText] = useState("");

    // // State for confirmation modal
    // const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);


    // const toggleFlip = () => {
    //     setIsFlipped(!isFlipped);
    // }

    // useEffect(() => {
    //     async function fetchTestQuestions() {
    //         const flashcardQuestions = await getAllQuestionsAndOptionsFromATest(testID);
    //         setFlashcardArray(flashcardQuestions);
    //     }
    //     fetchTestQuestions();

    // }, [testID])

    // useEffect(() => {

    //     if (isDisabled) {
    //         const handleKeyDown = null;
    //     } else {
    //         const handleKeyDown = (event) => {
    //             if (event.code === 'ArrowLeft') {
    //                 handlePreviousFlashcard();
    //             }
    //             else if (event.code === 'ArrowRight') {
    //                 handleNextFlashcard();
    //             }
    //             else if (event.code === 'Space') {
    //                 event.preventDefault();
    //                 toggleFlip();
    //             }
    //         };

    //         window.addEventListener('keydown', handleKeyDown);

    //         return () => {
    //             window.removeEventListener('keydown', handleKeyDown);
    //         };
    //     }
    // })

    // // control navigation through the array of flashcards
    // const handleNextFlashcard = () => {
    //     const trackedNums = [7, 14, 20];
    //     if (CurrentFlashcardIndex < flashcardArray.length - 1) {
    //         setCurrentFlashcardIndex(CurrentFlashcardIndex + 1)
    //         setIsFlipped(false);
    //     }
    //     let questionNo = Number(flashcardArray[CurrentFlashcardIndex]["QuestionNo"])+1; // This has a bug
    //     console.log(questionNo); 
    //     if (trackedNums.includes(questionNo)){
    //         trackFlashcardUsage(testID, questionNo);
    //     }
    // }

    // const handlePreviousFlashcard = () => {
    //     if (CurrentFlashcardIndex > 0) {
    //         setCurrentFlashcardIndex(CurrentFlashcardIndex - 1);
    //         setIsFlipped(false);
    //     }
    // }

    // const handleEditFlashcard = () => {
    //     if (!isFlipped) {
    //         setNewUpdatedText(flashcardArray[CurrentFlashcardIndex]["QuestionText"]);
    //     } else {
    //         setNewUpdatedText(flashcardArray[CurrentFlashcardIndex]["Elaboration"]);
    //     }
    //     setIsEditing(!isEditing);
    //     setIsDisabled(!isDisabled);
    // }
    // const disableFlip = () => {
    //     return;
    // }

    // const handleChange = (event) => {
    //     const { value } = event.target;
    //     setNewUpdatedText(value);

    // }

    // const handleConfirm = () => {
    //     setIsConfirmModalOpen(true);
    // }

    // if (flashcardArray.length === 0) {
    //     return <div>Loading...</div>; // Display a loading state while questions are being fetched
    //     // without this, the page will show error as the flashcardArray will be undefined while awaiting
    // }

    // return (
    //     <div className={styles.wrapper}>

    //         <div onClick={isDisabled ? disableFlip : toggleFlip} className={`${styles.FlashcardContainer} ${isFlipped ? styles.isFlipped : ''}`}>
    //             <div className={styles.FlashcardFace + " " + styles.FrontFlashcardContent}>
    //                 {isEditing ? <textarea value={newUpdatedText} id='editTextBox' name='updatedText' onChange={handleChange} /> : flashcardArray[CurrentFlashcardIndex]["QuestionText"]}
    //             </div>
    //             <div className={`${styles.FlashcardFace} ${isFlipped ? styles.BackFlashcardContent : styles.FrontFlashcardContent}`}>
    //                 <button title='cancelEdit' onClick={handleEditFlashcard} className={isEditing ? styles.cancelBtn : styles.cancelBtnHidden}>Cancel</button>
    //                 <button title='confirmEdit' onClick={handleConfirm} className={`${isEditing ? styles.confirmBtn : styles.confirmBtnHidden}`}>Confirm</button>
    //             </div>

    //             <div className={styles.FlashcardFace + " " + styles.BackFlashcardContent}>
    //                 {isEditing ? <textarea value={newUpdatedText} id='editTextBox' name='updatedText' onChange={handleChange} /> : flashcardArray[CurrentFlashcardIndex]["Elaboration"]}
    //             </div>
    //             <img src={flipIcon} alt='flip flashcard icon' title='flip flashcard' className={`${!isFlipped ? styles.flipIconFront : styles.flipIconBack}`} />
    //         </div>

    //         {isEditing === false &&
    //             <div className={styles.buttons}>
    //                 <button title='previous flashcard' className={styles.previousBtn} onClick={handlePreviousFlashcard} disabled={CurrentFlashcardIndex === 0}> <BsArrowLeftShort /></button>
    //                 <button title='revision schedule' className={styles.RevisionScheduleButton} onClick={() => navigate('/home/revision-schedule')}><GrSchedules /></button>
    //                 <button title='home' className={styles.HomeButton} onClick={() => navigate('/home')}><FaHome /></button>
    //                 <button title='edit' className={styles.EditButton} onClick={handleEditFlashcard} ><FaEdit /></button>
    //                 <button title='next flashcard' className={styles.nextBtn} onClick={handleNextFlashcard} disabled={CurrentFlashcardIndex === flashcardArray.length - 1} ><BsArrowRightShort /></button>
    //             </div>
    //         }

    //         <div className={styles.counter}>
    //             {flashcardArray[CurrentFlashcardIndex]["QuestionNo"]} of {flashcardArray.length}
    //         </div>
    //         {isConfirmModalOpen && <ConfirmModal setIsOpen={setIsConfirmModalOpen} testID={testID} newUpdatedText={newUpdatedText} questionNo={flashcardArray[CurrentFlashcardIndex]["QuestionNo"]} isBack={isFlipped} />}
    //     </div>
        

    // )
}

export default Flashcard;