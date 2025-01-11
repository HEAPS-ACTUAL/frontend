import React from 'react'
import Confetti from 'react-confetti'

export default () => {

    return (
        <Confetti
            numberOfPieces={1000}
            recycle={false}
            friction={1}
        />
    )
}