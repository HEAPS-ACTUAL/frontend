import React, { useState } from 'react';
import styles from '../../../styles/Quiz.module.css';
import { useNavigate } from 'react-router-dom'; 

const QuizFeature = () => {
    const questions = [
        {   
            id:1,
            question: "What is the first step in creating a website with MailChimp?",
            options: ["Create the site structure", "Modify the style, fonts and color palette", "Create a MailChimp account", "Add, edit, move and delete page sections"],
            correctAnswer: "Create a MailChimp account",
            explanation: "The first step in creating a website with MailChimp is to create a MailChimp account."
        },

        {   
            id:2,
            question: "What is an important component of the 'About Us' Page?",
            options: ["Highlighting product prices", "Describing the business story and key people", "Adding images of products", "Including a sales page"],
            correctAnswer: "Describing the business story and key people",
            explanation: "An important component of the 'About us' page is to deseribe the story of the business and the people that are part of it.",
        },

        {   
            id:3,
            question: "What is the purpose of optimizing a website for search engines?",
            options: ["To increase website loading speed", "To improve website design", "To enhance website security", "To improve visibility in search engine results"],
            correctAnswer: "To improve visibility in search engine results",
            explanation: "The purpose of optimizing a website for search engines is to improve its visibility and ranking in search engine results.",
        },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const navigate = useNavigate();

    // update userAnswers object if the user change his answers
    const handleAnswerChange = (questionID, answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers, // new object that has the same key: value pairs as the current userAnswers object
            [questionID] : answer, // updates the key: value pairs accordingly
        }));
    }

    // control navigation through the array of questions
    const handleNextQuestion = () => {

        // if there are more questions to be answered 
        if(currentQuestionIndex < questions.length -1){ 
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }

        // no more questions to be answered, navigate to the results page
        else{
            navigate ( '/ResultsPage', { state: {userAnswers, questions} } )
            // passes additional state to the /results route. 
            // userAnswers - object containing all the answers given by the user
            // questions - array of questions
            // information is accessible on the results page, allowing it to summarize the quiz results based on the answers and questions.
        }
    }

    const handlePreviousQuestion = () =>{
        if(currentQuestionIndex > 0){
            setCurrentQuestionIndex(currentQuestionIndex-1)
        }
    }

    return(
        <div className={styles.QuizContainer}>

            {/* display the question */}
            <div className={styles.Question}>
                {questions[currentQuestionIndex].id}. {questions[currentQuestionIndex].question}
            </div>

            {/* display the options */}
            <div className={styles.optionsContainer}>

                {questions[currentQuestionIndex].options.map((option) => (

                <div 
                    key = {option}
                    onClick = {() => handleAnswerChange(questions[currentQuestionIndex].id, option)}
                    className={`${styles.option} ${userAnswers[questions[currentQuestionIndex].id] === option ? styles.selectedOption : ''}`}                >
                    {option}
                </div>
                ))}
            </div>

            {/* buttons */}
            <div className={styles.buttonsContainer}>

                <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className={styles.btnPrev}>
                    Previous
                </button>

                <button onClick={handleNextQuestion} className={styles.btnNext}>
                    {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
                </button>

            </div>
            
            <div className={styles.countQuestions}>
                <p>{questions[currentQuestionIndex].id} of {questions.length}</p>
            </div>



        </div>
    )


}

export default QuizFeature;