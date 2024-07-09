import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import styles from '../../styles/AttemptsQuizzes.module.css';

const quizData = [
    {"AttemptNo": 1, "NumOfCorrectAnswers": 10, "TotalNumOfQuestions": 20},
    {"AttemptNo": 2, "NumOfCorrectAnswers": 15, "TotalNumOfQuestions": 20},
    {"AttemptNo": 3, "NumOfCorrectAnswers": 20, "TotalNumOfQuestions": 20},
    {"AttemptNo": 4, "NumOfCorrectAnswers": 25, "TotalNumOfQuestions": 20},
]


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
        navigate('../../home')
    }

    return (
        <div>
            <h2>Previous Quiz Results</h2>
            <table border='1'>
                <tbody> {/* need this tbody (below) if not the console will have a warning... u can try to comment it out to see the warning */}
                    <tr>
                        <th>Attempt Number</th>
                        <th>Score</th>
                        <th>View Quiz</th>
                    </tr>
                </tbody>
            
                <tbody>
                    {attemptsArray.map((attempt) => (
                        <tr key={attempt.AttemptNo}>
                            <td> {attempt.AttemptNo} </td>
                            <td>{attempt.NumOfCorrectAnswers}/{numberOfQuestions}</td>
                            <td><button onClick={() => handleViewQuiz(attempt.AttemptNo)}>View Quiz</button></td>
                        </tr>

                        // return <td key={index}>{data.AttemptNo}</td>;
                        // return <td key={index}>{data.NumOfCorrectAnswers}/{data.TotalNumOfQuestions}</td>;
                        // return <td key={index}><button>View Quiz</button></td>;
                    ))}
                </tbody>
            </table>

            <button onClick={handleReattemptQuiz}> Attempt quiz again! </button>
            <button onClick={handleBackToHome}> Back to home </button>
        </div>
    )
}

export default AttemptsQuizzesTable;