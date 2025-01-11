import React, { useEffect, useState } from "react";
import styles from '../styles/CompletedFlashcard.module.css'
import ProgressRing from "../components/ProgressRing";
import Confetti from "../components/Confetti";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTestName } from "../services/TestService";

function CompletedFlashcardPage() {
    const { id } = useParams()
    const location = useLocation();
    const navigate = useNavigate()
    const { knowFlashcards, unsureFlashcards } = (location.state);

    const percentage = (knowFlashcards.length / (knowFlashcards.length + unsureFlashcards.length)) * 100

    const [flashcardTitle, setFlashcardTitle] = useState('')

    useEffect(() => {

        async function fetchTestName(){
            let test = await getTestName(id)
            setFlashcardTitle(test.testName)
        }

        fetchTestName()

    }, [id])

    function handleResetFlashcardsClicked(){
        const currentPath = window.location.pathname
        const newPath = currentPath.replace('/completed', '')

        navigate(newPath)
    }

    function handleReviewUnsureFlashcardsClicked(){
        const currentPath = window.location.pathname
        const newPath = currentPath.replace('/completed', '')

        navigate(newPath, {state: {
            knowFlashcardsArray: knowFlashcards,
            unsureFlashcardsArray: unsureFlashcards
        }})
    }

    return (
        <div className={styles.container}>
            <Confetti /> 

            <div className={styles.header}>
                <h3> Congratulations!! You have completed </h3>
                <p style={{fontWeight: 'normal'}}> {flashcardTitle} </p>
            </div>

            <div className={styles.progressContainer}>
                <p style={{color: 'grey', fontWeight: 'bold'}}> Your progress... </p>
                <div className={styles.progress}>
                    <div style={{width: '150px', height: '150px'}}>
                        <ProgressRing percentage={parseInt(percentage)}/>
                    </div>
                    <div>
                        <p className={styles.remembered}> Remembered: <a style={{fontWeight: '600'}}> {knowFlashcards.length} </a> </p>
                        <p className={styles.unsure}> Unsure: <a style={{fontWeight: '600'}}> {unsureFlashcards.length} </a> </p>
                    </div>
                </div>
            </div>

            <div className={styles.buttonsContainer}>
                <button onClick={handleResetFlashcardsClicked}> Restart Flashcards </button>
                <button onClick={handleReviewUnsureFlashcardsClicked}> Review Unsure Flashcards </button>
            </div>
        </div>
    )
}

export default CompletedFlashcardPage