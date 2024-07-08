import React from "react";

// import styles from '../../styles/AttemptsQuizzes.module.css';

const quizData = [
    {"TestID": 1, "AttemptNo": 1, "NumOfCorrectAnswers": 10, "TotalNumOfQuestions": 20},
    {"TestID": 2, "AttemptNo": 2, "NumOfCorrectAnswers": 15, "TotalNumOfQuestions": 20},
    {"TestID": 3, "AttemptNo": 3, "NumOfCorrectAnswers": 20, "TotalNumOfQuestions": 20},
    {"TestID": 4, "AttemptNo": 4, "NumOfCorrectAnswers": 25, "TotalNumOfQuestions": 20},
]


function AttemptsQuizzesTable () {

    return (
        <div>
            <h2>Previous Quiz Results</h2>
            <table>
                <tr>
                    <th>Attempt Number</th>
                    <th>Score</th>
                    <th>View Quiz</th>
                </tr>
                
            <tr>
            {quizData.map((data, index) => {
                return <td key={index}>{data.AttemptNo}</td>;
                return <td key={index}>{data.NumOfCorrectAnswers}/{data.TotalNumOfQuestions}</td>;
                return <td key={index}><button>View Quiz</button></td>;
                
            })};
            </tr>
            </table>
        </div>
    )
};



export default AttemptsQuizzesTable;


  