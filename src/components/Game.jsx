import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Btn from './Btn.jsx'
import '../css/Game.css'

//Array of colors
const colors = ['green', 'red', 'yellow', 'blue']

function Game() {
    //State for the sequence of colors
    const [sequence, setSequence] = useState([])
    const [playing, setPlaying] = useState(false)
    const [userIndex, setUserIndex] = useState(0)
    const [score, setScore] = useState(0)
    //Ref to keep track of the current color
    const greenRef = useRef(null)
    const redRef = useRef(null)
    const yellowRef = useRef(null)
    const blueRef = useRef(null)

    //Function to update the top score    
    useEffect(() => {
        if(sequence.length > score){
            setScore(score + 1)
        }
    }, [sequence])

    //Function to add a new color to the sequence
    const addNewColor = () => {
        const color = colors[Math.floor(Math.random() * 4)]
        const newSequence = [...sequence, color]
        setSequence(newSequence)
    }

    const handleNextLevel = () => {
        if(!playing){
            setPlaying(true)
            addNewColor()
        }
    }
    const restartGame = () => {
        setSequence([])
        setPlaying(false)
        setUserIndex(0)
    }

    const handleColorClick = (event) => {
        if(playing){
            event.target.classList.add('button-active')
            setTimeout(() => {
                event.target.classList.remove('button-active')
                const clickColor = event.target.id
                //Check if the color clicked is the correct one
                if(sequence[userIndex] === clickColor)
                    {
                        //Check if the color clicked is the last one in the sequence
                        if(userIndex === sequence.length -1){
                            setTimeout(() => {
                                setUserIndex(0)
                                addNewColor()
                            }, 250)
                        }
                        //If the color clicked is not the last one in the sequence
                        else
                        {
                            setUserIndex(userIndex + 1)
                        }
                
                    }
                //If the color clicked is not the correct one 
                else 
                    {
                        alert("You lost")
                        restartGame()
                    }
            }, 250)
            }
        }
    
    //UseEffect to show the sequence
    useEffect(() => {
        if(sequence.length > 0){
            const showSequence = (index = 0) =>{
                let ref = null
                if(sequence[index] === "green") ref = greenRef
                if(sequence[index] === "red") ref = redRef
                if(sequence[index] === "yellow") ref = yellowRef
                if(sequence[index] === "blue") ref = blueRef
    
                setTimeout(() => {
                    ref.current.classList.add('button-active')
                    setTimeout(() => {
                        ref.current.classList.remove('button-active')
                        if(index < sequence.length - 1){
                            showSequence(index + 1)
                        }
                    }, 250)
                },250)
            }
            showSequence()
        } 
    }, [sequence])

    return (
        <>
        <div className='container'>
            <h1 className='title'>SIMON SAYS</h1>
            <h2 className='points'>Top Score:{score}</h2>
            <div className='MainContainer'>
                {/*Game Container*/}
                <div className='GameContainer'>

                    {/*Column green and red */}
                    <div>
                        <Btn id="green" ref={greenRef} onClick={handleColorClick}/>
                        <Btn id='red' ref ={redRef} onClick={handleColorClick}/>
                    </div>

                    {/*Column yellow and blue */}
                    <div>
                        <Btn id='yellow' ref={yellowRef} onClick={handleColorClick} />
                        <Btn id='blue' ref={blueRef} onClick={handleColorClick}/>
                    </div>
                </div>

                {/*Play Button*/}
                <button className='buttonPlay' onClick={handleNextLevel}>
                    {sequence.length === 0 ? 'PLAY' : sequence.length}
                    </button>
            </div>
        </div>
        </>

    )
}

export default Game

