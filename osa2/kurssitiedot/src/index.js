import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
  return (
    <div>
      <h2>{course}</h2>
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

const Total = ({ parts }) => {

  const numberOfExercises = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <div>
      <b>Total of {numberOfExercises} exercises</b>
    </div>
  )
}

const Course = ({ course }) => {

  // console.log('course välittää Headerille:', course.name)
  // console.log('course välittää Contentille ja partsille:', course.parts)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {

  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => {
        return (
          <Course key={course.id} course={course} />
        )
      })}
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))