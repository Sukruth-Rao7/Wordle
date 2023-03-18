import { useState } from "react"

const useWordle = (solution) => {

    const [turn, setTurn] = useState(0) 
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array = 6 rows
    const [history, setHistory] = useState([]) // each guess is a string- for duplicate guesses
    const [isCorrect, setIsCorrect] = useState(false) //changes to true once you win the game

    //format a new guess into an array of letter objects
    //e.g. [{key property and a color property}]
    //if green - right place
    //if yellow - not correct place but corect letter
    //grey - not correct

    const guessWord = () => {
        let solutionArray = [...solution] //converting string to array of individual letters
        let formattedGuess = [...currentGuess].map((l) => { //each letter is converted into an object "l" which has two properties key color
            return {key: l, color: 'grey'}
        })

        //find any green letters
        formattedGuess.forEach((l, i) => {
            if(solutionArray[i] === l.key){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })
        //yellow lettersm letters in the wrong place
        formattedGuess.forEach((l, i) => {
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    }
    //add a new guess
    const addNewGuess = (guessed) => {
        if(currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = guessed
            return newGuesses
        })
        setHistory((prevHistroy) => {
            return [...prevHistroy, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setCurrentGuess('')
    }

    const handleKeyup = ({ key }) => {

        if(key === 'Enter'){
            //only add guess if turn is < 5
            //do not allow duplicate words
            //word must be 5 characters long
            if(turn > 5){
                console.log('No more guesses left, Better luck next time')
                return
            }
            
            if(history.includes(currentGuess)){
                console.log('Word already guessed, Enter a new word')
                return
            }
            if(currentGuess.length !== 5){
                console.log('Word must be 5 letter long')
                return
            }
            const guessed = guessWord()
            addNewGuess(guessed)
            

        }
        if(key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0, -1) //remove last character in the string when backspace is pressed
            })
            return
        }
        if(/^[A-Za-z]$/.test(key)) { //regex
            if(currentGuess.length < 5){
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        } 

    }


    return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle