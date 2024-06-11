import React, {useState} from 'react';
import styles from '../../styles/Quiz.module.css'

function QuizFeature () {

    // questions array
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["New York", "London", "Paris", "Berlin"],
            answer: "Paris",
            explanation: "Paris is the capital city of France."
        },

        {
            question: "What is the capital of switzerland?",
            options: ["Bern", "Zurich", "Lucerne", "Interlaken"],
            answer: "Bern",
            explanation: "Bern is the capital city of Switzerland."
        },

        {
            question: "Which part of Switzerland is the Matterhorn located at?",
            options: ["Zermatt", "Lauterbrunnen", "Wengen", "Montreux"],
            answer: "Zermatt",
            explanation: "The Matterhorn is located in Zermatt, Switzerland."
        },
    ];

    // state to track index of current qn and selected option
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    // handler for 'Next' button
    const handleNext = () => {
        setShowExplanation(false); // hide explanation for next qn
        setSelectedOption(null); // reset selection

        if (currentQuestion < questions.length - 1) { // checks if the current question is not the last one in the list of questions.
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    // handler for 'Submit' button
    const handleSubmit = () =>{
        setShowExplanation(true); // show explanation
    };

    // handler for selecting an option
    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setShowExplanation(false); // Hide explanation when a new option is selected
    };

    return(
        <div className={styles.QuizContainer}>
           
            <div className={styles.question}>{currentQuestion + 1}. {questions[currentQuestion].question}</div>
            <div className={styles.optionsContainer} >
                {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className={styles.options}>
                    
                        <input
                            type = "radio"
                            value = {option}
                            checked = {selectedOption === option}
                            onChange={() => handleOptionChange(option)}
                        />
                        {option}
                    </div>
                    
                ))}
            </div>
            <div>
                {showExplanation && <p>{questions[currentQuestion].explanation}</p>}
            </div>

            <div className='buttonsContainer'>
            <button onClick={handleSubmit} className={styles.btnSubmit} >Submit</button>
            <button onClick={handleNext} className={styles.btnNext}>Next</button>
            </div>
        </div>
    );
}

export default QuizFeature;