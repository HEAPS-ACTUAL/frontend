import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/ResultsPage.module.css';

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userAnswers, questions } = location.state;

    return (
        <div className={styles.QuizResultsContainer}>
            <h1>Results</h1>
            {questions.map((question) => (
                <div key={question.id} className={styles.QuestionBlock}>
                    <h2 className={styles.Question}>{question.id}. {question.question}</h2>
                    <div className={styles.OptionsContainer}>
                        {question.options.map((option) => (
                            <div key={option} className={`${styles.Option} 
                                ${option === userAnswers[question.id] ? styles.UserAnswer : ''}
                                ${option === question.correctAnswer ? styles.CorrectAnswer : ''}`}>
                                {option}
                            </div>
                        ))}
                    </div>
                    <div className={styles.Explanation}>Explanation: {question.explanation}</div>
                </div>
            ))}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br> 
            {/* this is to test the scrolling */}
        </div>
    );
}

export default ResultsPage;
