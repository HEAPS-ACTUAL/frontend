import { useEffect, useState } from 'react';
import styles from '../../../styles/QuizCard.module.css';
import { getNumberOfQuestions } from '../../../services (for backend)/QuestionService';

// images
import difficultyImage from '../../../images/difficultyImage.png';
import calendarImage from '../../../images/calendar.png';

function QuizCard({email, quizID, name, difficulty, dateCreated}){
    const difficultyDict = {'E': 'Easy', 'M': 'intermediate', 'H': 'Hard'};
    difficulty = difficultyDict[difficulty];
    dateCreated = dateCreated.slice(0,10);
    
    const [numberOfQuestions, setNumberOfQuestions] = useState(undefined);
    
    async function fetchNumberOfQuestions(){
        const numberOfQuestions = await getNumberOfQuestions(email, quizID) - 2;
        setNumberOfQuestions(numberOfQuestions);
    }

    useEffect(() => {
        fetchNumberOfQuestions();
    });

    // const numberOfQuestions = 10;
    return (
        <div className={styles.quizCard}>
            
            <h3>{name}</h3>
            {/* <p> {quizID} </p> */}
            <p> 
                <img src={difficultyImage}/>
                {difficulty}
            </p>
            <p> 
                <img src={calendarImage}/>
                {dateCreated}
            </p>

            <p>
                {numberOfQuestions} questions
            </p>
        </div>
    )
}

export default QuizCard;