import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Quiz.module.css';
import { useLocation, useNavigate } from 'react-router-dom'; 

import { getLatestAttempt, markQuizAsDone } from '../../../services/QuizService';
import { storeUserQuizAnswers } from '../../../services/QuizService';
import { getAllQuestionsAndOptionsFromATest } from '../../../services/TestService';

const QuizFeature = () => {
    const location = useLocation(); 
    const {testID} = (location.state); // to retrieve testID from QuizCard page
    
    const [questionsOptionsArray, setQuestionsOptionsArray] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [notCompletedMessage, setNotCompletedMessage] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchQuizQuestionsAndOptions(){
            const quizQuestionsAndOptions = await getAllQuestionsAndOptionsFromATest(testID);
            setQuestionsOptionsArray(quizQuestionsAndOptions);
        }

        fetchQuizQuestionsAndOptions();

    }, [testID])

    // update userAnswers object if the user change his answers
    const handleAnswerChange = (questionNo, answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers, // new object that has the same key: value pairs as the current userAnswers object
            [questionNo] : answer, // updates the key: value pairs accordingly
        }));
    }

    // control navigation through the array of questions
    const handleNextQuestion = async () => {        
        // if there are more questions to be answered 
        if(currentQuestionIndex < questionsOptionsArray.length -1){ 
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }

        // no more questions to be answered, navigate to the results page
        else{
            await storeUserQuizAnswers(testID, userAnswers);
            markQuizAsDone(testID);
            
            const attemptNo = await getLatestAttempt(testID);
            navigate ('/test/results-page', {state: {testID: testID, attemptNo: attemptNo['LatestAttempt']}});
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
                {questionsOptionsArray[currentQuestionIndex]['QuestionNo']}. {questionsOptionsArray[currentQuestionIndex]['QuestionText']}
            </div>

            {/* display the options */}
            <div className={styles.optionsContainer}>

                {(questionsOptionsArray[currentQuestionIndex]['Options']).map((option_obj) => (
                    <div 
                        key = {option_obj['OptionLetter']}
                        onClick = {() => handleAnswerChange(questionsOptionsArray[currentQuestionIndex]['QuestionNo'], option_obj['OptionLetter'])}
                        className={`${styles.option} ${userAnswers[questionsOptionsArray[currentQuestionIndex]['QuestionNo']] === option_obj['OptionLetter'] ? styles.selectedOption : ''}`}                
                    >
                        {option_obj['OptionText']}
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
                <p>{questionsOptionsArray[currentQuestionIndex]['QuestionNo']} of {questionsOptionsArray.length}</p>
            </div>
        </div>
    )
}

export default QuizFeature;