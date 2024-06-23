import React, { useState, useEffect } from "react";
import styles from "../../../styles/Home.module.css";

// Functions
import {
  getSalutation,
  getUserFirstName,
} from "../../../services (for backend)/UserService";
import {
  generateQuiz,
  getCompletedQuizzes,
  getToDoQuizzes,
} from "../../../services (for backend)/QuizService";

// Pages
import QuizCard from "./QuizCard";

function Home() {
  const email = sessionStorage.getItem("userEmail");

  const [firstName, setFirstName] = useState("");
  const [salutation, setSalutation] = useState("");
  const [quizList, setQuizList] = useState([]);
  const [selectedButton, setSelectedButton] = useState("to-do");
  const [file, setFile] = useState(null);
  const [quizName, setQuizName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [createQuizMessage, setCreateQuizMessage] = useState("");

  useEffect(() => {
    fetchUserInfo();
    fetchToDoQuizzes();
  }, []);

  async function fetchUserInfo() {
    try {
      const firstName = await getUserFirstName(email);
      setFirstName(firstName);
    } catch (error) {
      console.error("Error fetching user first name:", error);
    }

    try {
      const salutation = await getSalutation(email);
      setSalutation(salutation);
    } catch (error) {
      console.error("Error fetching salutation:", error);
    }
  }

  async function fetchToDoQuizzes() {
    try {
      const ToDoQuizzesArray = await getToDoQuizzes(email);
      console.log("Fetched To-Do Quizzes:", ToDoQuizzesArray);
      setQuizList(ToDoQuizzesArray || []); // Ensure quizList is an empty array if null
    } catch (error) {
      console.error("Error fetching to-do quizzes:", error);
      setQuizList([]); // Ensure quizList is an empty array on error
    }
  }

  async function fetchCompletedQuizzes() {
    try {
      const CompletedQuizzesArray = await getCompletedQuizzes(email);
      console.log("Fetched Completed Quizzes:", CompletedQuizzesArray);
      setQuizList(CompletedQuizzesArray || []); // Ensure quizList is an empty array if null
    } catch (error) {
      console.error("Error fetching completed quizzes:", error);
      setQuizList([]); // Ensure quizList is an empty array on error
    }
  }

  function handleFileUpload(event) {
    event.preventDefault();

    if (quizName === "") {
      setCreateQuizMessage("Quiz name cannot be empty!");
    } else if (difficulty === "") {
      setCreateQuizMessage("Please indicate the difficulty level!");
    } else {
      console.log("Generating quiz with:", {
        email,
        quizName,
        difficulty,
        file,
      });
      generateQuiz(email, quizName, difficulty, file)
        .then((response) => {
          console.log("Quiz generated successfully:", response);
          fetchToDoQuizzes(); // fetch quizzes again to update the list
        })
        .catch((error) => {
          setCreateQuizMessage(`Error generating quiz: ${error.message}`);
        });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.greeting}>
        <div className={styles.name}>Hello {firstName}, </div>
        <div className={styles.line}>
          {" "}
          ready to conquer some new knowledge today?{" "}
        </div>
      </div>

      <div className={styles.createQuiz}>
        <h2> Create a quiz </h2>

        <form onSubmit={handleFileUpload}>
          <input
            type="text"
            placeholder="Enter Quiz Name"
            onChange={(event) => setQuizName(event.target.value)}
          />

          <div className={styles.difficultyAndChooseFile}>
            <select
              className={styles.difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              <option value="">Select difficulty level</option>
              <option value="E">Easy</option>
              <option value="M">Intermediate</option>
              <option value="H">Hard</option>
            </select>

            <input
              className={styles.chooseFile}
              type="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div>

          {createQuizMessage && <p>{createQuizMessage}</p>}

          <button type="submit"> Generate Quiz! </button>
        </form>
      </div>

      <div className={styles.yourQuizzes}>
        <h2> Your quizzes </h2>
        <button
          className={
            selectedButton === "to-do"
              ? styles.selectedButton
              : styles.notSelectedButton
          }
          onClick={() => {
            fetchToDoQuizzes();
            setSelectedButton("to-do");
          }}
        >
          To-Do
        </button>

        <button
          className={
            selectedButton === "completed"
              ? styles.selectedButton
              : styles.notSelectedButton
          }
          onClick={() => {
            fetchCompletedQuizzes();
            setSelectedButton("completed");
          }}
        >
          Completed
        </button>
        <div className={styles.quizList}>
          {Array.isArray(quizList) && quizList.length === 0 ? (
            <p className={styles.noQuizMessage}>
              {selectedButton === "to-do"
                ? "You do not have any quizzes. Create a quiz above!"
                : "You have not completed any quizzes yet!"}{" "}
            </p>
          ) : (
            Array.isArray(quizList) &&
            quizList.map((quiz) => {
              return (
                <QuizCard
                  key={quiz.QuizID}
                  email={quiz.UserEmail}
                  quizID={quiz.QuizID}
                  name={quiz.QuizName}
                  difficulty={quiz.Difficulty}
                  dateCreated={quiz.DateTimeCreated}
                  selectedButton={selectedButton}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
