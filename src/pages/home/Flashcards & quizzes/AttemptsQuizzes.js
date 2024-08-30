import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from '../../../styles/AttemptsQuizzes.module.css';
import { IoIosHome } from "react-icons/io";
import { GrPowerCycle } from "react-icons/gr";
import { trackReattemptQuiz } from "../../../services/PostHogAnalyticsServices";

function AttemptsQuizzesTable () {
    const navigate = useNavigate();
    const location = useLocation();

    const testID = location.state['testID'];
    const attemptsArray = location.state['attempts'];
    const numberOfQuestions = location.state['numberOfQuestions'];

    function handleViewQuiz(attemptNo) {
        navigate('../../test/results-page', { state: { testID: testID, attemptNo: attemptNo } });
    }

    function handleReattemptQuiz(){
        trackReattemptQuiz(testID);
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
                <button onClick={handleReattemptQuiz} className={styles.buttonAQ}> 
                    <GrPowerCycle /> <p> Attempt quiz again! </p>
                </button>


                <button onClick={handleBackToHome} className={styles.buttonHome}>
                    <IoIosHome /> <p> Back to home </p>
                </button>
            </div>
        </div>
    )
}

export default AttemptsQuizzesTable;