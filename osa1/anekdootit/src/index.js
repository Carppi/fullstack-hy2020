import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {

  const { handleClick, text } = props

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

//satunnaislukugeneraattorin lähteenä käytetty: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//funktio palauttaa kokonaisluvun nollan ja max - 1 välillä
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const handleNextClick = () => {

    const anecdotesCount = props.anecdotes.length
    const nextAnecdoteNumber = getRandomInt(anecdotesCount)

    console.log("No of anecdotes: ", anecdotesCount)
    console.log("Next anecdote: ", nextAnecdoteNumber)

    setSelected(nextAnecdoteNumber)
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <div>
        <Button handleClick={handleNextClick} text="Next anecdote" />
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)