import React from 'react'
import { useParams } from 'react-router-dom'

function EditFlashcard() {

    const { id } = useParams()

    return (
        <div className='container mx-auto mt-12'>
            <h1 className='text-3xl text-center'> This is the Edit Flashcard page for Flashcard ID: {id} </h1>
        </div>
    )
}

export default EditFlashcard