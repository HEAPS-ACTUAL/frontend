import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../styles/ResultsPage.module.css';
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

// Functions
import { reviewQuiz } from '../../../services (for backend)/QuizService';

const ResultsPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const {testID, attemptNo} = location.state;

    const [quizReviewArray, setQuizReviewArray] = useState([]);
    const [userScore , setUserScore] = useState(null);
    const [totalQns , setTotalQns] = useState(null);

    
    useEffect(() => {
        async function fetchQuizReviewArray(){
            let returnedArray = await reviewQuiz(testID, attemptNo);
            setUserScore(returnedArray['NumOfCorrectAnswers']);
            setTotalQns(returnedArray['TotalNumOfQuestions']);
            returnedArray = JSON.parse(returnedArray['QuestionsAndAnswers']);
            setQuizReviewArray(returnedArray);
        }
        
        fetchQuizReviewArray();

    }, [testID, attemptNo]);
    
    
    return (
        <div className={styles.QuizResultsContainer}>
            <div className={styles.Header} AttemptNo={attemptNo}> Results: Attempt {attemptNo} </div>
            
          
            <div className={styles.score}>Score: {userScore} / {totalQns} </div>


            {quizReviewArray.map((question_obj) => (
                <div key={question_obj['QuestionNo']} className={styles.QuestionBlock}>

                    <h2 className={styles.Question}>
                        {question_obj['QuestionNo']}. {question_obj['QuestionText']}
                    </h2>
                    
                    <div className={styles.OptionsContainer}>
                        {question_obj['Options'].map((option_obj) => (
                            <div key={option_obj['OptionLetter']} className={`${styles.Option}
                                ${option_obj['OptionLetter'] === question_obj['UserChoice'] ? styles.UserAnswer : ''}
                                ${option_obj['OptionLetter'] === question_obj['CorrectOption'] ? styles.CorrectAnswer : ''}
                                ${option_obj['OptionLetter'] !== question_obj['UserChoice'] ? styles.UnselectedOption : ''}`}
                            >
                                {option_obj['OptionLetter'] === question_obj['CorrectOption'] ? <TiTick className={styles.CorrectIcon} /> : null}
                                {option_obj['OptionLetter'] !== question_obj['CorrectOption'] && option_obj['OptionLetter'] === question_obj['UserChoice'] ? <RxCross2 className={styles.IncorrectIcon} /> : null}
                                {option_obj['OptionText']}
                            
                            </div>
                        ))}

                    </div>
                    
                    <div 
                        className={`${styles.Explanation}
                        ${question_obj['UserChoice'] === question_obj['CorrectOption'] ? styles.ExplanationForCorrectAns : styles.ExplanationForIncorrectAns}`}
                    >
                        Explanation: {question_obj['Elaboration']}
                    </div>                    
                </div>
            ))}
            
            <div className={styles.BtnContainer}>
                <button className={styles.buttonNavigate} onClick={() => navigate('../attempts')}>View All Attempts </button>
                <button className={styles.HomeButton} onClick={() => navigate('/home')}>Back to Home</button>
            </div>
            
            <br></br>
            <br></br>
            <br></br>

        </div>
    )
};

export default ResultsPage;