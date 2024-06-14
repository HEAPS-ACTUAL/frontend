// import React, {useState} from 'react';
// import styles from '../../styles/Quiz.module.css'

// function QuizFeature () {

//     // questions array
//     const questions = [
//         {
//             question: "What is the capital of France?",
//             options: ["New York", "London", "Paris", "Berlin"],
//             answer: "Paris",
//             explanation: "Paris is the capital city of France."
//         },

//         {
//             question: "What is the capital of switzerland?",
//             options: ["Bern", "Zurich", "Lucerne", "Interlaken"],
//             answer: "Bern",
//             explanation: "Bern is the capital city of Switzerland."
//         },

//         {
//             question: "Which part of Switzerland is the Matterhorn located at?",
//             options: ["Zermatt", "Lauterbrunnen", "Wengen", "Montreux"],
//             answer: "Zermatt",
//             explanation: "The Matterhorn is located in Zermatt, Switzerland."
//         },
//     ];

//     // state to track index of current qn and selected option
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [showExplanation, setShowExplanation] = useState(false);

//     // handler for 'Next' button
//     const handleNext = () => {
//         setShowExplanation(false); // hide explanation for next qn
//         setSelectedOption(null); // reset selection

//         if (currentQuestion < questions.length - 1) { // checks if the current question is not the last one in the list of questions.
//             setCurrentQuestion(currentQuestion + 1);
//         }
//     };

//     // handler for 'Submit' button
//     const handleSubmit = () =>{
//         setShowExplanation(true); // show explanation
//     };

//     // handler for selecting an option
//     const handleOptionClick = (option) => {
//         setSelectedOption(option);
//         setShowExplanation(false); // Hide explanation when a new option is selected
//     };

//     return(
//         <div className={styles.QuizContainer}>
           
//             <div className={styles.question}>{currentQuestion + 1}. {questions[currentQuestion].question}</div>
//             <div className={styles.optionsContainer} >
//                 {questions[currentQuestion].options.map((option, index) => (
//                     <div key={index} 
//                     className={`${styles.option} ${selectedOption === option ? styles.selectedOption : ''}`}
//                     onClick={() => handleOptionClick(option)}>
//                    {option}
//                     </div> //  I DONT UNDERSTAND THIS PART OF THE CODE, NEED TO FIND OUT MORE
                    
//                 ))}
                
//             </div>
//             <div>
//                 {showExplanation && <p>{questions[currentQuestion].explanation}</p>}
//             </div>

//             <div className='buttonsContainer'>
//             <button onClick={handleSubmit} className={styles.btnSubmit} >Submit</button>
//             <button onClick={handleNext} className={styles.btnNext}>Next</button>
//             </div>
//         </div>
//     );
// }

// export default QuizFeature;

// // i want all the options button to have the same width, once the user submits,
// // if the option chosen is correct, then show a green tick icon beside the option
// // if the option chosen is wrong, show a red cross icon beside the option chosen

import React, { useState } from 'react';
import styles from '../../../styles/Quiz.module.css';
import { useNavigate } from 'react-router-dom'; 

function QuizFeature() {
    const questions = [
                {
                    question: "What is the first step in creating a website with MailChimp?",
                    options: ["Create the site structure", "Modify the style, fonts and color palette", "Create a MailChimp account", "Add, edit, move and delete page sections"],
                    answer: "Create a MailChimp account",
                    explanation: "The first step in creating a website with MailChimp is to create a MailChimp account."
                },
        
                {
                    question: "What is an important componoent of the 'About Us' Page?",
                    options: ["Highlighting product prices", "Describing the business story and key people", "Adding images of products", "Including a sales page"],
                    answer: "Describing the business story and key people",
                    explanation: "An important component of the 'About us' page is to deseribe the story of the business and the people that are part of it.",
                },
        
                {
                    question: "What is the purpose of optimizing a website for search engines?",
                    options: ["To increase website loading speed", "To improve website design", "To enhance website security", "To improve visibility in search engine results"],
                    answer: "To improve visibility in search engine results",
                    explanation: "The purpose of optimizing a website for search engines is to improve its visibility and ranking in search engine results.",
                },
            ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({}); // to store all user selections
    const [submit, setSubmit] = useState(false); // to track whether the user has submitted the quiz
    const navigate = useNavigate(); // create an instance of use navigate

    // go to the next question
    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    // go to the previous question
    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    // Function to handle option selection
    const handleOptionClick = (option) => {
        setUserAnswers({
            ...userAnswers,
            [currentQuestion]: option
        });
    };

    // Function to submit the quiz
    const handleSubmit = () => {
        setSubmit(true);
        navigate('/results', { state: { questions, userAnswers } });  // Pass quiz data to the results page
    };

    // Render option with feedback after submission
    const renderOption = (option, index) => {
        const isCorrect = option === questions[currentQuestion].answer;
        const isSelected = option === userAnswers[currentQuestion];
        const optionStyles = isSelected ? styles.selectedOption : styles.option;
        
        return (
            <div key={index}
                className={`${optionStyles} ${submit && isSelected ? (isCorrect ? styles.correct : styles.incorrect) : ''}`}
                onClick={() => !submit && handleOptionClick(option)}>
                {option}
                {submit && isSelected && (isCorrect ? "✅" : "❌")}
            </div>
        );
    };

    return (
        <div className={styles.QuizContainer}>
            <div className={styles.question}>{currentQuestion + 1}. {questions[currentQuestion].question}</div>
            <div className={styles.optionsContainer}>
                {questions[currentQuestion].options.map(renderOption)}
            </div>
            <div>
                {submit && <p>{questions[currentQuestion].explanation}</p>}
            </div>
            <div className='buttonsContainer'>
                {currentQuestion > 0 && <button onClick={handlePrevious} className={styles.btnPrev}>Previous</button>}
                {currentQuestion < questions.length - 1 && <button onClick={handleNext} className={styles.btnNext}>Next</button>}
                {currentQuestion === questions.length - 1 && <button onClick={handleSubmit} className={styles.btnSubmit}>Submit</button>}
            </div>
        </div>
    );
}

export default QuizFeature;
