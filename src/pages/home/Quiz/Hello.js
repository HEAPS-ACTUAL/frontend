import { useEffect, useState } from 'react';
import styles from '../../../styles/Quiz.module.css';
import { useLocation, useNavigate } from 'react-router-dom'; 

import { getAllQuestionsAndOptionsFromAQuiz } from '../../../services (for backend)/QuestionService';

const Hello = () => {
    // const location = useLocation(); 
    // const {email, quizID} = (location.state); // to retrieve UserEmail and QuizID from QuizCard page
    // console.log(location.state);

    const email = 'jerricknsc@gmail.com';
    const quizID = 1;

    const navigate = useNavigate();
    const [questionsOptionsArray, setQuestionsOptionsArray] = useState([]);

    useEffect(() => {
        
        async function fetchQuizQuestionsAndOptions(){
            const quizQuestionsAndOptions = await getAllQuestionsAndOptionsFromAQuiz(email, quizID);
            setQuestionsOptionsArray(quizQuestionsAndOptions['questions']);
            console.log(questionsOptionsArray);
        }

        // console.log('byebye');
        fetchQuizQuestionsAndOptions();
    }, [])

    useEffect(() => {
        console.log(questionsOptionsArray);
    }, [questionsOptionsArray]);
    
    if (questionsOptionsArray.length === 0) {
        return <div>Loading...</div>; // Display a loading state while questions are being fetched
    }

    return(
        <div> {questionsOptionsArray[0].text} </div>
    )
}

export default Hello;