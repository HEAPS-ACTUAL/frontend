import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/QuizCard.module.css';

// images
import difficultyImage from '../../../images/difficultyImage.png';
import calendarImage from '../../../images/calendar.png';
import xButton from '../../../images/x-button.png';

// functions
import { getNumberOfQuestions } from '../../../services (for backend)/QuestionService';
import { deleteQuiz } from '../../../services (for backend)/QuizService';

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
    
    const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);
    const [cancelDelete, setCancelDelete] = useState(false);

    function handleDeleteQuiz(event){
        event.stopPropagation();
        setDeleteButtonPressed(true);
    }

    function handleCancelDelete(){
        setCancelDelete(true);
        
        setTimeout(() => {
            setDeleteButtonPressed(false);
            setCancelDelete(false);
        }, 500);
    }
    
    return (
        <div className={selectedButton ==='to-do' ? styles.toDoQuizCard : styles.completedQuizCard}> 
            <div className={styles.quizCardWrapper}>
                <div className={styles.quizCard} onClick={goToQuiz}>
                    <img className={styles.deleteButton} src={xButton} onClick={handleDeleteQuiz} alt='delete button' />
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

                {deleteButtonPressed && (
                    <div className={`${styles.deleteConfirmation} ${cancelDelete == true ? styles.dontShowDelete : ''}`}>
                        <p>Are you sure you want to delete this quiz?</p>
                        
                        <div>
                            <button> yes </button>
                            <button onClick={handleCancelDelete}> no </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default QuizCard;