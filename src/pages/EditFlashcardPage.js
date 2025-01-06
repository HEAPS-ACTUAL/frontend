import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditFlashcard() {

    const { id } = useParams()
    const navigate = useNavigate()

    function handleBackClicked(){
        const currentPath = window.location.pathname
        const newPath = currentPath.replace('/edit', '')

        navigate(newPath)
    }

    return (
        <div className='container mx-auto mt-12'>
            <h1 className='text-3xl text-center'> This is the Edit Flashcard page for Flashcard ID: {id} </h1>
            <button onClick={handleBackClicked} class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Back </button>
        </div>
    )
}

export default EditFlashcard