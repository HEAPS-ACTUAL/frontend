import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Quiz.module.css';
import { useLocation, useNavigate } from 'react-router-dom'; 

import { getAllQuestionsAndOptionsFromAQuiz } from '../../../services (for backend)/QuestionService';

const QuizFeature = () => {
    const location = useLocation(); 
    const {email, quizID} = (location.state); // to retrieve UserEmail and QuizID from QuizCard page
    
    const [questionsOptionsArray, setQuestionsOptionsArray] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [notCompletedMessage, setNotCompletedMessage] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchQuizQuestionsAndOptions(){
            const quizQuestionsAndOptions = await getAllQuestionsAndOptionsFromAQuiz(email, quizID);
            setQuestionsOptionsArray(quizQuestionsAndOptions['questions']);
        }

        fetchQuizQuestionsAndOptions();

    }, [])

    // update userAnswers object if the user change his answers
    const handleAnswerChange = (questionNo, answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers, // new object that has the same key: value pairs as the current userAnswers object
            [questionNo] : answer, // updates the key: value pairs accordingly
        }));
    }

    // control navigation through the array of questions
    const handleNextQuestion = () => {        
        // if there are more questions to be answered 
        if(currentQuestionIndex < questionsOptionsArray.length -1){ 
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }

        // no more questions to be answered, navigate to the results page
        else{
            navigate ( '/ResultsPage', { state: {email, quizID, userAnswers, questionsOptionsArray} } )
            // passes additional state to the /results route. 
            // userAnswers - object containing all the answers given by the user
            // questions - array of questions
            // information is accessible on the results page, allowing it to summarize the quiz results based on the answers and questions.
        }
    }

    const handlePreviousQuestion = () =>{
        setNotCompletedMessage('');
        if(currentQuestionIndex > 0){
            setCurrentQuestionIndex(currentQuestionIndex-1)
        }
    }

    if (questionsOptionsArray.length === 0) {
        return <div>Loading...</div>; // Display a loading state while questions are being fetched
    }

    return(
        <div className={styles.QuizContainer}>

            {/* display the question */}
            <div className={styles.Question}>
                {questionsOptionsArray[currentQuestionIndex]['number']}. {questionsOptionsArray[currentQuestionIndex]['text']}
            </div>

            {/* display the options */}
            <div className={styles.optionsContainer}>

                {questionsOptionsArray[currentQuestionIndex]['options'].map((option_obj) => (
                    <div 
                        key = {option_obj['letter']}
                        onClick = {() => handleAnswerChange(questionsOptionsArray[currentQuestionIndex]['number'], option_obj['letter'])}
                        className={`${styles.option} ${userAnswers[questionsOptionsArray[currentQuestionIndex]['number']] === option_obj['letter'] ? styles.selectedOption : ''}`}                
                    >
                        {option_obj['text']}
                    </div>
                ))}
            </div>

            {/* buttons */}
            <div className={styles.buttonsContainer}>

                <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className={styles.btnPrev}>
                    Previous
                </button>

                <button onClick={handleNextQuestion} disabled={!((currentQuestionIndex + 1) in userAnswers)} className={styles.btnNext}>
                    {currentQuestionIndex < questionsOptionsArray.length - 1 ? 'Next' : 'Finish'}
                </button>

            </div>

            <div>
                {notCompletedMessage}
            </div>
            
            <div className={styles.countQuestions}>
                <p>{questionsOptionsArray[currentQuestionIndex]['number']} of {questionsOptionsArray.length}</p>
            </div>
        </div>
    )
}

export default QuizFeature;