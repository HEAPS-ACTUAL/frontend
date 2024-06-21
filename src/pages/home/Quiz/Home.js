import React, { useState, useEffect } from "react";
import styles from "../../../styles/Home.module.css";
import { useNavigate } from "react-router-dom";

// Functions
import { getSalutation, getUserFirstName} from "../../../services (for backend)/UserService";
import { generateQuiz, getCompletedQuizzes, getToDoQuizzes} from "../../../services (for backend)/QuizService";
import { convertFileSizeTo2DP, fileSizeWithinLimit, fileTypeIsPDF } from "../../../services (for backend)/FileServices";

// Pages
import QuizCard from "./QuizCard";

function Home() {
    const navigate = useNavigate();
    const email = sessionStorage.getItem("userEmail");

    const [firstName, setFirstName] = useState("");
    const [salutation, setSalutation] = useState("");
    const [quizList, setQuizList] = useState([]);
    const [selectedButton, setSelectedButton] = useState("to-do");    

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
    const [quizName, setQuizName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [testType, setTestType] = useState([]);
    const [createQuizMessage, setCreateQuizMessage] = useState('');

    function handleFileUpload(event) { // isaiah to change
        event.preventDefault();

        if(quizName.trim() === ''){
            setCreateQuizMessage('Quiz name cannot be empty!');
        }
        else if(difficulty === ''){
            setCreateQuizMessage('Please indicate the difficulty level!');
        }
        else if(!file){
            setCreateQuizMessage('Please upload a file!');
        }
        else{
            const fileSize = convertFileSizeTo2DP(file);

            if(!fileTypeIsPDF(file)){
                setCreateQuizMessage('File type must be PDF!')
            }
            else if(!fileSizeWithinLimit(file)){
                setCreateQuizMessage(`Your file size has exceed the limit of 5MB.`)
            }
            else{
                console.log("Generating quiz with:", { email, quizName, testType, difficulty, file, fileSize: `${fileSize}MB`});
                
                generateQuiz(email, quizName, testType, difficulty, file);
                
                navigate ( 
                    '../../../LoadingPage', 
                    {state: 
                        {
                            duration: 40000, 
                            messageArray: [`Generating quiz, please wait...`, `This may take up to a minute`], 
                            redirect: '/home'
                        } 
                    }
                )
            }

        }
    }

    const handleCheckboxChange = (event) => {
        const {value, checked} = event.target;
    }

    return (
        <div className={styles.container}>
            <div className={styles.greeting}>
                <div className={styles.name}>Hello {firstName}, </div>
                <div className={styles.line}> ready to conquer some new knowledge today? </div>
            </div>

            <div className={styles.createQuiz}>
                <h2> Create </h2>

                <form onSubmit={handleFileUpload}>
                    <input type="text" placeholder="Enter a Name" onChange={(event) => setQuizName(event.target.value)}/>

                    <div className={styles.difficultyAndChooseFile}>
                        <select className={styles.difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                            <option value="">Select difficulty level</option>
                            <option value="E">Easy</option>
                            <option value="M">Intermediate</option>
                            <option value="H">Hard</option>
                        </select>

                        <input className={styles.chooseFile}type="file" onChange={(event) => setFile(event.target.files[0])}/>
                    </div>
                    <div className={styles.testTypeCheckbox} onChange={(event) => setTestType(event.target.checked)}>
                    <label><input type='checkbox' name='testType' value='Q'/> Quiz</label>
                    <label><input type='checkbox' name='testType' value='F'/> Flashcard</label>
                    </div>
                    <br/>
                    <button type="submit"> Generate Now! </button> 
                   
                    {createQuizMessage && <p>{createQuizMessage}</p>}
                </form>
            </div>

            {/* flashcards */}
            <div className={styles.yourQuizzes}>
                <h2> Your Flashcards </h2>
                <button 
                    className={
                        selectedButton === 'to-do' ? styles.selectedButton : styles.notSelectedButton
                    }
                    onClick={() => {
                        fetchToDoQuizzes(); 
                        setSelectedButton('to-do');
                    }}> 
                    To-Do 
                </button>

                <button
                    className={
                        selectedButton === 'completed' ? styles.selectedButton : styles.notSelectedButton
                    }
                    onClick={() => {
                        fetchCompletedQuizzes();
                        setSelectedButton('completed');
                    }}> 
                    Completed 
                </button>

                <div className={styles.quizList}>
                    {quizList.length === 0 
                        ? <p className={styles.noQuizMessage}>{selectedButton === 'to-do' ? 'You do not have any quizzes. Create a quiz above!' : 'You have not completed any quizzes yet!'} </p>
                        : quizList.map((quiz) => {
                            return (
                                <QuizCard 
                                    key = {quiz.TestID}
                                    email = {quiz.UserEmail}
                                    quizID = {quiz.QuizID}
                                    name = {quiz.QuizName}
                                    difficulty = {quiz.Difficulty}
                                    dateCreated = {quiz.DateTimeCreated}
                                    selectedButton = {selectedButton}
                                />
                            )
                        })
                    } 
                </div>
            </div>

            {/* quizzes */}
            <div className={styles.yourQuizzes}>
                <h2> Your Quizzes </h2>
                <button 
                    className={
                        selectedButton === 'to-do' ? styles.selectedButton : styles.notSelectedButton
                    }
                    onClick={() => {
                        fetchToDoQuizzes(); 
                        setSelectedButton('to-do');
                    }}> 
                    To-Do 
                </button>

                <button
                    className={
                        selectedButton === 'completed' ? styles.selectedButton : styles.notSelectedButton
                    }
                    onClick={() => {
                        fetchCompletedQuizzes();
                        setSelectedButton('completed');
                    }}> 
                    Completed 
                </button>
                <div className={styles.quizList}>
                    {quizList.length === 0 
                        ? <p className={styles.noQuizMessage}>{selectedButton === 'to-do' ? 'You do not have any quizzes. Create a quiz above!' : 'You have not completed any quizzes yet!'} </p>
                        : quizList.map((quiz) => {
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
                        })
                    } 
                </div>
            </div>
        </div>
    );
}

export default Home;
