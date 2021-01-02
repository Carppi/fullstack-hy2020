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

  const parts = props.parts

  return (

    <div>
      { // alla testattuna loopia, joka ei kuitenkaan lopulta toiminut sijoitusvaiheessa
      /* {parts.forEach(element => {
        console.log(element);
        console.log(element.name);
        <Part partName={element.name} exerciseNumber={element.exercises} />
      })} */}

      <Part partName={parts[0].name} exerciseNumber={parts[0].exercises} />
      <Part partName={parts[1].name} exerciseNumber={parts[1].exercises} />
      <Part partName={parts[2].name} exerciseNumber={parts[2].exercises} />
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

  const parts = props.parts
  let numberOfExercises = 0

  parts.forEach(element => {
    numberOfExercises += element.exercises
  });

  return (
    <p>Number of exercises {numberOfExercises}</p>
  )
}

const App = () => {

  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (

    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))
