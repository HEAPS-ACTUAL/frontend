import React from 'react'
import { useParams } from 'react-router-dom'
import Confetti from '../components/Confetti'

function CompletedFlashcardPage() {

    const { id } = useParams()

    const flashcardTitle = 'Computational Thinking Week 3'

    return (
        <div className='container mx-auto mt-12'>
            <Confetti />
            <h1 className='text-3xl text-center'> Congratulations!! You have completed {flashcardTitle} id: {id} </h1>
        </div>
    )
}

export default CompletedFlashcardPage