import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../styles/ResultsPage.module.css';
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userAnswers, questionsOptionsArray } = location.state;

    return (
        <div className={styles.QuizResultsContainer}>
            <div className={styles.Header}>Results</div>
            {questionsOptionsArray.map((question) => (
                <div key={question.id} className={styles.QuestionBlock}>
                    <h2 className={styles.Question}>
                        {question.id}. {question.question}
                    </h2>
                    
                    <div className={styles.OptionsContainer}>
                        {question.options.map((option) => (

                        <div key={option} className={`${styles.Option} 
                            ${option === userAnswers[question.id] ? styles.UserAnswer : ''}
                            ${option === question.correctAnswer ? styles.CorrectAnswer : ''}
                            ${!userAnswers[question.id] ? styles.UnselectedOption : ''}`}>
                                
                            {option === question.correctAnswer ? <TiTick className={styles.CorrectIcon} /> : null}
                            {option !== question.correctAnswer && option === userAnswers[question.id] ? <RxCross2 className={styles.IncorrectIcon} /> : null}
                            {option}
                        </div>
                        ))}

                    </div>
                    
                    <div className={`${styles.Explanation} 
                        ${userAnswers[question.id] === question.correctAnswer ? styles.ExplanationForCorrectAns : styles.ExplanationForIncorrectAns}`}>
                        Explanation: {question.explanation}
                    </div>                    
                </div>
            ))}
            

            <div className={styles.BtnContainer}>
                <button className={styles.RestartButton} onClick={() => navigate('/Quiz')}>Restart Quiz</button>
                <button className={styles.HomeButton} onClick={() => navigate('/Home')}>Back to Home</button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>

    );
};

export default ResultsPage;