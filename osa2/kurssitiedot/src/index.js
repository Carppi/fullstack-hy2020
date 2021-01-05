import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({ parts }) => {

  return (
    parts.map(part => {
      return (
        <Part key={part.id} partName={part.name} exerciseNumber={part.exercises} />
      )
    })
  )

}

const Part = ({ partName, exerciseNumber }) => {
  //console.log('part component is running')
  return (<p>{partName} {exerciseNumber}</p>)
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

const Course = ({ course }) => {

  // console.log('course välittää Headerille:', course.name)
  // console.log('course välittää Contentille ja partsille:', course.parts)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      {/* <Total parts={course.parts} />  add this later*/}
    </div>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))