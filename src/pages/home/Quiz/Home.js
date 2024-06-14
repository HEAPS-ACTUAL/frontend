import React, { useState, useEffect } from "react";
import styles from '../../../styles/Home.module.css'

// Functions
import { getSalutation, getUserFirstName } from "../../../services (for backend)/UserService";
import { generateQuiz, getCompletedQuizzes, getToDoQuizzes} from "../../../services (for backend)/QuizService";

// Pages
import QuizCard from "./QuizCard";

function Home() {
    const email = sessionStorage.getItem('userEmail');

    const [firstName, setFirstName] = useState('');
    const [salutation, setSalutation] = useState('');
    const [quizList, setQuizList] = useState([]);
    const [selectedButton, setSelectedButton] = useState('to-do')

    async function fetchUserInfo() {
        const firstName = await getUserFirstName(email);
        setFirstName(firstName);

        const salutation = await getSalutation(email);
        setSalutation(salutation);
    }

    async function fetchToDoQuizzes(){
        const ToDoQuizzesArray = await getToDoQuizzes(email);
        setQuizList(ToDoQuizzesArray);
    }

    async function fetchCompletedQuizzes(){
        const CompletedQuizzesArray = await getCompletedQuizzes(email);
        setQuizList(CompletedQuizzesArray);
    }

    useEffect(() => {
        fetchUserInfo();
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
                    <h2> Create a quiz </h2>

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
                    <h2> Your quizzes </h2>
                    <div className={styles.quizListContainer}>
                        <button 
                            onClick={() => {
                                fetchToDoQuizzes(); 
                                setSelectedButton('to-do');
                            }}> 
                            To-Do 
                        </button>

                        <button
                            onClick={() => {
                                fetchCompletedQuizzes();
                                setSelectedButton('completed');
                            }}> 
                            Completed 
                        </button>
                    </div>
                    <div className={styles.quizList}>
                        {quizList.map((quiz) => {
                            return (
                                <QuizCard 
                                    name = {quiz.QuizName}
                                    difficulty = {quiz.Difficulty}
                                    dateCreated = {quiz.DateTimeCreated}
                                />
                            )
                        })} 
                        
                    </div>
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
              

                <h1>this is to test the scrolling</h1>
            </div>
        </div>
    );
}

export default Home;