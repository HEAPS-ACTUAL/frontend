import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../styles/ResultsPage.module.css';
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const ResultsPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { email, quizID, userAnswers, questionsOptionsArray } = location.state;
    // console.log(location.state);

    const optionDict = {'A': 0, 'B': 1, 'C': 2, 'D': 3};

    return (
        <div className={styles.QuizResultsContainer}>
            <div className={styles.Header}>Results</div>

            {questionsOptionsArray.map((question_obj) => (
                <div key={question_obj['number']} className={styles.QuestionBlock}>

                    <h2 className={styles.Question}>
                        {question_obj['number']}. {question_obj['text']}
                    </h2>
                    
                    <div className={styles.OptionsContainer}>
                        {question_obj['options'].map((option_obj) => (
                            <div key={option_obj['letter']} className={`${styles.Option}
                                ${option_obj['letter'] === userAnswers[question_obj['number']] ? styles.UserAnswer : ''}
                                ${option_obj['isCorrect'] == true ? styles.CorrectAnswer : ''}
                                ${!userAnswers[question_obj['number']] ? styles.UnselectedOption : ''}`}
                            >
                                {option_obj['isCorrect'] == true ? <TiTick className={styles.CorrectIcon} /> : null}
                                {option_obj['isCorrect'] == false && userAnswers[question_obj['number']] === option_obj['letter'] ? <RxCross2 className={styles.IncorrectIcon} /> : null}
                                {option_obj['text']}
                            
                            </div>
                        ))}

                    </div>
                    
                    <div 
                        className={`${styles.Explanation}
                        ${ question_obj['options'][optionDict[userAnswers[question_obj['number']]]]['isCorrect'] == true ? styles.ExplanationForCorrectAns : styles.ExplanationForIncorrectAns}`}
                    >
                        Explanation: {question_obj['elaboration']}
                    </div>                    
                </div>
            ))}
            
            <div className={styles.BtnContainer}>
                <button className={styles.RestartButton} onClick={() => navigate('/mcq', {state: {email, quizID}})}>Restart Quiz</button>
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