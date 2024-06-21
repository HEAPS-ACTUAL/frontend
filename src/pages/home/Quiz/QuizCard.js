import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/QuizCard.module.css';

// images
import difficultyImage from '../../../images/difficultyImage.png';
import calendarImage from '../../../images/calendar.png';
import xButton from '../../../images/x-button.png';

// functions
import { getNumberOfQuestions } from '../../../services (for backend)/QuestionService';
import { deleteQuiz } from '../../../services (for backend)/TestService';

function QuizCard({email, quizID, name, difficulty, dateCreated, selectedButton}){

    const difficultyDict = 
    {
        'E': 'Easy', 
        'M': 'Intermediate', 
        'H': 'Hard'
    };

    difficulty = difficultyDict[difficulty];
    dateCreated = dateCreated.slice(0,10);
    
    const [numberOfQuestions, setNumberOfQuestions] = useState(undefined);
    
    async function fetchNumberOfQuestions(){
        const numberOfQuestions = await getNumberOfQuestions(email, quizID);
        setNumberOfQuestions(numberOfQuestions);
    }

    useEffect(() => {
        fetchNumberOfQuestions();
    });

    const navigate = useNavigate();

    function goToQuiz(){
        navigate('../../mcq', {state: {email, quizID}});
    }
    
    const [xButtonPressed, setXButtonPressed] = useState(false);
    const [cancelDelete, setCancelDelete] = useState(false);

    function handleXButtonPressed(event){
        event.stopPropagation();
        setXButtonPressed(true);
    }

    function handleCancelDelete(){
        setCancelDelete(true);
        
        setTimeout(() => {
            setXButtonPressed(false);
            setCancelDelete(false);
        }, 500);
    }

    async function handleConfirmDelete(){
        const deleteOk = await deleteQuiz(email, quizID, name);

        navigate(
            '../../../LoadingPage', 
            {state: 
                {
                    duration: 1500, 
                    messageArray: [`Deleting ${name}...`], 
                    redirect: '/home'
                } 
            }
        )
    }
    
    return (
        <div className={selectedButton ==='to-do' ? styles.toDoQuizCard : styles.completedQuizCard}> 
            <div className={styles.quizCardWrapper}>
                <div className={styles.quizCard} onClick={goToQuiz}>
                    <img className={styles.deleteButton} src={xButton} onClick={handleXButtonPressed} alt='delete button' />
                    <h3>{name}</h3>
                    <p className={styles.quizInfo}>
                        <img className={styles.difficultyImage} src={difficultyImage} alt='man pushing boulder uphill'/>
                        {difficulty}
                    </p>
                    <p className={styles.quizInfo}>
                        <img className={styles.calendarImage} src={calendarImage} alt='calendar'/>
                        {dateCreated}
                    </p>
                    <p className={styles.numOfQuestions}>
                        {numberOfQuestions} questions
                    </p>
                </div>

                {xButtonPressed && (
                    <div className={`${styles.deleteConfirmation} ${cancelDelete == true ? styles.dontShowDelete : ''}`}>
                        <p>Are you sure you want to delete {name}?</p>
                        <br></br>
                        <p> This action cannot be undone!! </p>
                        
                        <div className={styles.yesNoButtons}>
                            <button className={styles.confirmDelete} onClick={handleConfirmDelete}> Yes </button>
                            <button className={styles.cancelDelete} onClick={handleCancelDelete}> No </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default QuizCard;