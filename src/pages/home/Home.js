import React, { useState, useEffect } from "react";
import styles from '../../styles/Quizzes.module.css'

// Functions
import { getSalutation, getUserFirstName } from "../../services (for backend)/UserService";
import { generateQuiz, getAllUndoneQuizzes } from "../../services (for backend)/QuizService";

function Quizzes() {
    const email = sessionStorage.getItem('userEmail');

    const [firstName, setFirstName] = useState('');
    const [salutation, setSalutation] = useState('');
    const [undoneQuizzes, setUndoneQuizzes] = useState([]);

    useEffect(() => {
        async function fetchUserInfo() {
            const firstName = await getUserFirstName(email);
            setFirstName(firstName);

            const salutation = await getSalutation(email);
            setSalutation(salutation);
        }

        async function fetchUndoneQuizzes(){
            const undoneQuizzesArray = await getAllUndoneQuizzes(email);
            setUndoneQuizzes(undoneQuizzesArray);
        }

        fetchUserInfo();
        fetchUndoneQuizzes();

    }, []);
    
    const [file, setFile] = useState([]);

    function handleFileUpload(event) {
        event.preventDefault();
        generateQuiz(email, 'sample quiz', 'E', file)
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.greeting}>
                    <div className={styles.name}>Hello {firstName}, </div>
                    <div className={styles.line}> ready to conquer some new knowledge today?</div>
                </div>

                <div className={styles.createQuiz}>
                    <h2> Create quizzes </h2>

                    <form onSubmit={handleFileUpload}>
                        <p> Please select only one file </p>
                        <br></br>
                        <input type="file" onChange={(event) => setFile(event.target.files)} />
                        <div>
                            {/* <button className={styles.uploadFileButton} type="submit"> Upload </button> */}
                            <button type='submit' className={styles.generateQuizButton}> Generate Quiz </button>
                        </div>
                    </form>
                </div>

                <div className={styles.reviewNow}>
                    <h2> New quizzes </h2>
                    <div className={styles.newQuizzesContainer}>
                        {/* <ol>
                            {undoneQuizzes.map((quiz) => {
                                return <li key={quiz.QuizName}> {quiz.QuizName} </li>
                            })}
                        </ol> */}
                    </div>
                </div>

                <div className={styles.allQuizzes}>
                    <h2> Completed quizzes </h2>
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <h1>this is to test the scrolling</h1>
            </div>
        </div>
    );
}

export default Quizzes;