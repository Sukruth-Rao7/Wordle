import React, { useEffect } from 'react'
import useWordle from '../hooks/useWorlde'

export default function Wordle({ solution }) {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn} = useWordle(solution) //grabbing (left) from the (right) hook

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)
        
        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup])

    useEffect(() => {
        console.log(guesses, turn, isCorrect)
    },[guesses, turn, isCorrect])

  return (
    <div>
    <div>solution: {solution}</div>
    <div>current Guess - { currentGuess }</div>
    </div>
  )
}
