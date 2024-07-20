import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/TestCard.module.css';

// images
import difficultyImage from '../../../images/difficultyImage.png';
import calendarImage from '../../../images/calendar.png';
import xButton from '../../../images/x-button.png';

// functions
import { deleteTest } from '../../../services/TestService';

function TestCard({testID, name, dateCreated, difficulty, numberOfQuestions, attempts, selectedButton}){
    dateCreated = dateCreated.slice(0,10);

    if(attempts !== undefined){
        attempts = JSON.parse(attempts);
    }

    const navigate = useNavigate();

    function handleTestClicked(){
        if(difficulty === null){ // DIFFICULTY WILL BE NULL IF ITS A FLASHCARD
            navigate('../../test/flashcard', {state: {testID}});
        }
        else{
            if(selectedButton === 'to-do'){
                navigate('../../test/quiz', {state: {testID}});
              }
            else if(selectedButton === 'completed'){
                navigate('../../test/attempts', {state: {testID, attempts, numberOfQuestions}});
            }
        }
    }
    
    const [xButtonPressed, setXButtonPressed] = useState(false);
    const [cancelDelete, setCancelDelete] = useState(false);

    function handleXButtonPressed(event){
        event.stopPropagation();
        setXButtonPressed(true);
    }

    function handleCancelDelete(){
        setCancelDelete(true);
        
        setTimeout(() => {
            setXButtonPressed(false);
            setCancelDelete(false);
        }, 500);
    }

    async function handleConfirmDelete(){
        await deleteTest(testID, name);

        navigate(
            '../../../loading-page', 
            {state: 
                {
                    duration: 1500, 
                    messageArray: [`Deleting ${name}...`], 
                    redirect: '/home'
                } 
            }
        )
    }
    
    return (
        <div 
            className={
                `${selectedButton ==='to-do' ? styles.toDoQuizCard : ''}
                ${selectedButton === 'completed' ? styles.completedQuizCard : ''}
                ${selectedButton === null ? styles.flashcard : ''}`
            }
        >
            
            <div className={styles.testCardWrapper}>
                <div className={styles.testCard} onClick={handleTestClicked} title={selectedButton === 'completed' ? 'view past attempts' : selectedButton === 'to-do' ? 'attempt quiz' : 'view flashcard'}>
                    <img title='delete' className={styles.deleteButton} src={xButton} onClick={handleXButtonPressed} alt='delete button' />
                    <h3>{name}</h3>

                    {difficulty !== null 
                        ? <p className={styles.testInfo}>
                            <img className={styles.difficultyImage} src={difficultyImage} alt='man pushing boulder uphill'/>
                            {difficulty}
                        </p>
                        : null
                    }
                   
                    <p className={styles.testInfo}>
                        <img className={styles.calendarImage} src={calendarImage} alt='calendar'/>
                        {dateCreated}
                    </p>

                    {attempts !== undefined
                        ? <p className={styles.numOfQuestions}>
                        Attempts: {attempts.length}
                        </p>
                        : <p className={styles.numOfQuestions}>
                            {numberOfQuestions} questions
                        </p>
                    }
                </div>

                {xButtonPressed && (
                    <div className={`${styles.deleteConfirmation} ${cancelDelete === true ? styles.dontShowDelete : ''}`}>
                        <p>Are you sure you want to delete {name}?</p>
                        <br></br>
                        <p> This action cannot be undone!! </p>
                        
                        <div className={styles.yesNoButtons}>
                            <button className={styles.confirmDelete} onClick={handleConfirmDelete}> Yes </button>
                            <button className={styles.cancelDelete} onClick={handleCancelDelete}> No </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TestCard;