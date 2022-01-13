import React from 'react';
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  interface CoursePart {
    name: string;
    exerciseCount: number;
  }

  //Header component should take care of 1. rendering the name of the course. 

  const Header = ({name}: { name: string}) => (
    <h1>{name}</h1>
  );

  //Content component should 1.render the names of the different parts and 2.the amount of exercises in each part

  const Content = ({parts}: { parts: CoursePart[] }): JSX.Element => {
    return (
      <div>
        {parts.map(part => (
          <p key={part.name}>
            {part.name} {part.exerciseCount}
          </p>
        ))}
      </div>
    )
  };

  //Total component should render the total sum of exercises in all parts.

  const Total = ({parts}: { parts: CoursePart[] }) => {
    return (
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
  };

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;