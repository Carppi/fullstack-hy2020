import React from 'react'

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

  export default Course