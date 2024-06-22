import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../styles/ResultsPage.module.css';
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const ResultsPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const {testID, userAnswers, questionsOptionsArray } = location.state;
    // console.log(location.state);

    const optionDict = {'A': 0, 'B': 1, 'C': 2, 'D': 3};

    return (
        <div className={styles.QuizResultsContainer}>
            <div className={styles.Header}>Results</div>

            {questionsOptionsArray.map((question_obj) => (
                <div key={question_obj['QuestionNo']} className={styles.QuestionBlock}>

                    <h2 className={styles.Question}>
                        {question_obj['QuestionNo']}. {question_obj['QuestionText']}
                    </h2>
                    
                    <div className={styles.OptionsContainer}>
                        {JSON.parse(question_obj['Options']).map((option_obj) => (
                            <div key={option_obj['OptionLetter']} className={`${styles.Option}
                                ${option_obj['OptionLetter'] === userAnswers[question_obj['QuestionNo']] ? styles.UserAnswer : ''}
                                ${option_obj['IsCorrect'] == true ? styles.CorrectAnswer : ''}
                                ${!userAnswers[question_obj['QuestionNo']] ? styles.UnselectedOption : ''}`}
                            >
                                {option_obj['IsCorrect'] == true ? <TiTick className={styles.CorrectIcon} /> : null}
                                {option_obj['IsCorrect'] == false && userAnswers[question_obj['QuestionNo']] === option_obj['OptionLetter'] ? <RxCross2 className={styles.IncorrectIcon} /> : null}
                                {option_obj['OptionText']}
                            
                            </div>
                        ))}

                    </div>
                    
                    <div 
                        className={`${styles.Explanation}
                        ${ JSON.parse(question_obj['Options'])[optionDict[userAnswers[question_obj['QuestionNo']]]]['IsCorrect'] == true ? styles.ExplanationForCorrectAns : styles.ExplanationForIncorrectAns}`}
                    >
                        Explanation: {question_obj['Elaboration']}
                    </div>                    
                </div>
            ))}
            
            <div className={styles.BtnContainer}>
                <button className={styles.RestartButton} onClick={() => navigate('/mcq', {state: {testID}})}>Restart Quiz</button>
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