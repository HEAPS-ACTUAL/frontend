import React, { useState, useEffect } from "react";
import styles from "../../../styles/Home.module.css";
import { useNavigate } from "react-router-dom";

// Functions
import { getSalutation, getUserFirstName} from "../../../services (for backend)/UserService";
import { generateQuiz, getCompletedQuizzes, getToDoQuizzes} from "../../../services (for backend)/QuizService";
import { convertFileSizeTo2DP, fileSizeWithinLimit, fileTypeIsPDF } from "../../../services (for backend)/FileServices";
import { getAllFlashcardsByUser } from "../../../services (for backend)/FlashcardService";

// Components
import TestCard from "./TestCard";

function Home() {
    const navigate = useNavigate();
    const email = sessionStorage.getItem("userEmail");

    const [firstName, setFirstName] = useState("");
    const [salutation, setSalutation] = useState("");
    const [quizList, setQuizList] = useState([]);
    const [flashcardList, setFlashcardList] = useState([]);
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

    async function fetchFlashcards(){
        const FlashcardsArray = await getAllFlashcardsByUser(email);
        setFlashcardList(FlashcardsArray);
    }

    useEffect(() => {
        fetchUserInfo();
        fetchToDoQuizzes();
        fetchFlashcards();
    }, []);

    const [file, setFile] = useState(null);
    const [quizName, setQuizName] = useState("");
    const [difficulty, setDifficulty] = useState("");
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
                console.log("Generating quiz with:", { email, quizName, difficulty, file, fileSize: `${fileSize}MB`});
                
                generateQuiz(email, quizName, difficulty, file);
                
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

    return (
        <div className={styles.container}>
            <div className={styles.greeting}>
                <div className={styles.name}>Hello {firstName}, </div>
                <div className={styles.line}> ready to conquer some new knowledge today? </div>
            </div>

            <div className={styles.createQuiz}>
                <h2> Create a quiz </h2>

                <form onSubmit={handleFileUpload}>
                    <input type="text" placeholder="Enter Quiz Name" onChange={(event) => setQuizName(event.target.value)}/>

                    <div className={styles.difficultyAndChooseFile}>
                        <select className={styles.difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                            <option value="">Select difficulty level</option>
                            <option value="E">Easy</option>
                            <option value="M">Intermediate</option>
                            <option value="H">Hard</option>
                        </select>

                        <input className={styles.chooseFile}type="file" onChange={(event) => setFile(event.target.files[0])}/>
                    </div>

                    <button type="submit"> Generate Quiz! </button>
                   
                    {createQuizMessage && <p>{createQuizMessage}</p>}
                </form>
            </div>

            {/* flashcards */}
            <div className={styles.yourFlashcards}>
                <h2> Your Flashcards </h2>

                <div className={styles.flashcardList}>
                    {flashcardList.length === 0 
                        ? <p className={styles.noQuizMessage}> You do not have any flashcards. Create a flashcard above!</p>
                        : flashcardList.map((flashcard) => {
                            return (
                                <TestCard 
                                    key = {flashcard.TestID}
                                    testID = {flashcard.TestID}
                                    name = {flashcard.TestName}
                                    dateCreated = {flashcard.DateTimeCreated}
                                    difficulty = {null}
                                    numberOfQuestions = {flashcard.numOfQuestions}
                                    selectedButton = {null}
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
                                <TestCard 
                                    key = {quiz.TestID}
                                    testID = {quiz.TestID}
                                    name = {quiz.TestName}
                                    dateCreated = {quiz.DateTimeCreated}
                                    difficulty = {quiz.Difficulty}
                                    numberOfQuestions = {quiz.numOfQuestions}
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
