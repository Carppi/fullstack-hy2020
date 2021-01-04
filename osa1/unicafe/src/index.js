import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  // console.log(props)
  const { handleClick, text } = props

  return (
    < button onClick={handleClick} >
      {text}
    </button >
  )
}

const StatisticsLine = (props) => {

  const { text, value } = props

  return (
    <p>{text}: {value}</p>
  )
}

const Statistics = (props) => {
  
  console.log(props)

  const { good, neutral, bad } = props
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  const average = (good - bad) / all
  const positive = good / all * 100 + '%'

  return (
    <div>
      <StatisticsLine text="Good" value={good} />
      <StatisticsLine text="Neutral" value={neutral} />
      <StatisticsLine text="Bad" value={bad} />
      <StatisticsLine text="All" value={all} />
      <StatisticsLine text="Average" value={average} />
      <StatisticsLine text="Positive" value={positive} />
    </div>
  )

}

const App = () => {

  //napit tallennettuna omiin tiloihinsa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <h1>Statistics</h1>
      <Statistics bad={bad} neutral={neutral} good={good} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))