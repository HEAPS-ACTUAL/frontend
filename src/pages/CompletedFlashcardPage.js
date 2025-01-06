import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Confetti from '../components/Confetti'

function CompletedFlashcardPage() {

    const { id } = useParams()
    const location = useLocation();
    const navigate = useNavigate()
    const { knowFlashcards, unsureFlashcards } = (location.state);

    const flashcardTitle = 'Computational Thinking Week 3'

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
        <div className='container mx-auto mt-12 space-y-10'>
            <Confetti />

            <div>
                <h1 className='text-3xl text-center'> Congratulations!! You have completed {flashcardTitle} </h1>
            </div>

            <div className='space-y-3'>
                <div className='text-3xl text-center'> Your progress... </div>
                <div className='text-xl text-center'> Remembered: {knowFlashcards.length} </div>
                <div className='text-xl text-center'> Unsure: {unsureFlashcards.length} </div>
            </div>

            <div className='justify-center flex'>
                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleResetFlashcardsClicked}> Restart Flashcards </button>
                {/* <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleReviewUnsureFlashcardsClicked}> Review Unsure Flashcards </button> */}
            </div>
        </div>
    )
}

export default CompletedFlashcardPage