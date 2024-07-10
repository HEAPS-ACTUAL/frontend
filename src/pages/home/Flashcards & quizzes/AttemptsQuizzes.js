import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from '../../../styles/AttemptsQuizzes.module.css';
import { IoIosHome } from "react-icons/io";
import { GrPowerCycle } from "react-icons/gr";

function AttemptsQuizzesTable () {
    const navigate = useNavigate();
    const location = useLocation();

    const testID = location.state['testID'];
    const attemptsArray = location.state['attempts'];
    const numberOfQuestions = location.state['numberOfQuestions'];

    function handleViewQuiz(attemptNo){
        navigate('../../test/results-page', {state: {testID: testID, attemptNo: attemptNo}});
    }

    function handleReattemptQuiz(){
        navigate('../../test/quiz', {state: {testID: testID}});
    }

    function handleBackToHome(){
        navigate('../../home');
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Previous Quiz Results</h2>
            <table border='1' className={styles.table}>
                <tbody className={styles.trElementsHeader}> {/* need this tbody (below) if not the console will have a warning... u can try to comment it out to see the warning */}
                    <tr>
                        <th>Attempt Number</th>
                        <th>Score</th>
                        <th>View Quiz</th>
                    </tr>
                </tbody>
            
                <tbody className={styles.trElements}>
                    {attemptsArray.map((attempt) => (
                        <tr key={attempt.AttemptNo}>
                            <td>{attempt.AttemptNo}</td>
                            <td>{attempt.NumOfCorrectAnswers}/{numberOfQuestions}</td>
                            <td><button onClick={() => handleViewQuiz(attempt.AttemptNo)} className={styles.buttonReview}>Review Quiz</button></td>
                        </tr>

                    ))}
                </tbody>
            </table>
                    
            <div className={styles.buttonContainer}>
                <div className={styles.AlignIconsAndWords}>
                    <button onClick={handleReattemptQuiz} className={styles.buttonAQ}><GrPowerCycle /> Attempt quiz again! </button>
                </div>

                <div className={styles.AlignIconsAndWords}>
                    <button onClick={handleBackToHome} className={styles.buttonHome}><IoIosHome /> Back to home </button>
                </div>
            </div>
        </div>
    )
}

export default AttemptsQuizzesTable;