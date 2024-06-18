import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/QuizCard.module.css';
import { getNumberOfQuestions } from '../../../services (for backend)/QuestionService';

// images
import difficultyImage from '../../../images/difficultyImage.png';
import calendarImage from '../../../images/calendar.png';


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

    // const numberOfQuestions = 10;
    return (
        <div className={selectedButton ==='to-do' ? styles.toDoQuizCard : styles.completedQuizCard}> 
            <div className={styles.quizCard} onClick={goToQuiz}>
                <h3>{name}</h3>
                {/* <p> {quizID} </p> */}
                <p>
                    <img src={difficultyImage} alt='man pushing boulder uphill'/>
                    {difficulty}
                </p>
                <p>
                    <img src={calendarImage} alt='calendar'/>
                    {dateCreated}
                </p>
                <p className={styles.numOfQuestions}>
                    {numberOfQuestions} questions
                </p>
            </div>
        </div>
    )
}

export default QuizCard;