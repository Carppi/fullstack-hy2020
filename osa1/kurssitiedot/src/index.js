import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>{props.partName1} {props.number1}</p>
      <p>{props.partName2} {props.number2}</p>
      <p>{props.partName3} {props.number3}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p></p>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.number1 + props.number2 + props.number3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>

      <Header course={course} />
      <Content partName1={part1} number1={exercises1} partName2={part2} number2={exercises2} partName3={part3} number3={exercises3} />
      <Total number1={exercises1} number2={exercises2} number3={exercises3} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
