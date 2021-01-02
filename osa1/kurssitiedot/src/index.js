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
      <Part partName={props.partName1} exerciseNumber={props.number1}/>
      <Part partName={props.partName2} exerciseNumber={props.number2}/>
      <Part partName={props.partName3} exerciseNumber={props.number3}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.partName} {props.exerciseNumber}</p>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>

      <Header course={course} />
      <Content partName1={part1.name} number1={part1.exercises} partName2={part2.name} number2={part2.exercises} partName3={part3.name} number3={part3.exercises} />
      <Total number1={part1.exercises} number2={part2.exercises} number3={part3.exercises} />

    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))
