import React, { useState, useEffect } from "react";
import styles from "../../../styles/Home.module.css";

// Functions
import { getSalutation, getUserFirstName} from "../../../services (for backend)/UserService";
import { generateQuiz, getCompletedQuizzes, getToDoQuizzes} from "../../../services (for backend)/QuizService";

// Pages
import QuizCard from "./QuizCard";

function Home() {
    const email = sessionStorage.getItem("userEmail");

    const [firstName, setFirstName] = useState("");
    const [salutation, setSalutation] = useState("");
    const [quizList, setQuizList] = useState([]);
    const [selectedButton, setSelectedButton] = useState("to-do");
    const [quizName, setQuizName] = useState("");
    const [difficulty, setDifficulty] = useState("E"); // Default to 'Easy'
    

    async function fetchUserInfo() {
        const firstName = await getUserFirstName(email);
        setFirstName(firstName);

        const salutation = await getSalutation(email);
        setSalutation(salutation);
    }

    async function fetchToDoQuizzes() {
        const ToDoQuizzesArray = await getToDoQuizzes(email);
        setQuizList(ToDoQuizzesArray);
    }

    async function fetchCompletedQuizzes() {
        const CompletedQuizzesArray = await getCompletedQuizzes(email);
        setQuizList(CompletedQuizzesArray);
    }

    useEffect(() => {
        fetchUserInfo();
        fetchToDoQuizzes();
    }, []);

    const [file, setFile] = useState(null);

    function handleFileUpload(event) {
        event.preventDefault();
        console.log("Generating quiz with:", { email, quizName, difficulty, file });
        generateQuiz(email, quizName, difficulty, file)
            .then((response) => {
                console.log("Quiz generated successfully:", response);
                fetchToDoQuizzes(); // fetch quizzes again to update the list
            })
            .catch((error) => {
                console.error("Error generating quiz:", error);
            });
    }

    useEffect(() => {
        console.log(selectedButton);
    }, [selectedButton]);

    return (
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
                        <input type="file" onChange={(event) => setFile(event.target.files[0])}/>
                        <br></br>
                        <input type="text" placeholder="Enter Quiz Name" value={quizName} onChange={(event) => setQuizName(event.target.value)}/>
                        <br></br>
                        <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                            <option value="E">Easy</option>
                            <option value="M">Medium</option>
                            <option value="H">Hard</option>
                        </select>
                        <div>
                            <button type="submit" className={styles.generateQuizButton}> Generate Quiz </button>
                        </div>
                    </form>
                </div>
        <div className={styles.yourQuizzes}>
                        <h2> Your quizzes </h2>
                        <button 
                            className={
                                selectedButton == 'to-do' ? styles.selectedButton : styles.notSelectedButton
                            }
                            onClick={() => {
                                fetchToDoQuizzes(); 
                                setSelectedButton('to-do');
                            }}> 
                            To-Do 
                        </button>

                        <button
                            className={
                                selectedButton == 'completed' ? styles.selectedButton : styles.notSelectedButton
                            }
                            onClick={() => {
                                fetchCompletedQuizzes();
                                setSelectedButton('completed');
                            }}> 
                            Completed 
                        </button>
                        <div className={styles.quizList}>
                            {quizList.map((quiz) => {
                                return (
                                    <QuizCard 
                                        key = {quiz.QuizID}
                                        email = {quiz.UserEmail}
                                        quizID = {quiz.QuizID}
                                        name = {quiz.QuizName}
                                        difficulty = {quiz.Difficulty}
                                        dateCreated = {quiz.DateTimeCreated}
                                        selectedButton = {selectedButton}
                                    />
                                )
                            })} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
