import Die from "./Content"
import { useState } from "react"
import { nanoid } from "nanoid"
import ReactConfetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize"

export default function App() {
  function generateRandomArray() {
    return new Array(10).fill(0).map(() => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    })
  }
  function handleClick() {
    if(!gameWon){
      setDie(oldDice => oldDice.map(die =>
      die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
    ))
    } else {
      setDie(generateRandomArray())
    }
  }

  const [die, setDie] = useState(() => generateRandomArray())
  const randomDie = die.map((num) =>
    <Die key={num.id} value={num.value} isHeld={num.isHeld} onClick={() => changeVal(num.id)} />)
  function changeVal(id) {
    setDie(oldDie => oldDie.map(die =>
      die.id == id ? { ...die, isHeld: !die.isHeld } : die))
  }


  const gameWon = die.every(dice => dice.isHeld) &&
    die.every(dice => (dice.value === die[0].value))


  const buttonText = gameWon ? "New Game" : "Roll"
  const { width, height } = useWindowSize()
  return (
    <>
      {gameWon && <ReactConfetti 
      width={width}
      height={height}/>}
      <div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <section className="grid-container">
        {randomDie}
        <button className="rollDicee" onClick={handleClick}>{buttonText}</button>
      </section>
    </>
  )
}