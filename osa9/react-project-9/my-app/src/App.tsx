import React from 'react';
const App = () => {

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CoursePartBaseWithDescription extends CoursePartBase {
    description: string;
  }
  
  interface CourseNormalPart extends CoursePartBaseWithDescription {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }
  
  interface CourseSubmissionPart extends CoursePartBaseWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends CoursePartBaseWithDescription {
    type: "special";
    requirements: string[];
  }
  
  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  //HELPER FUNCTIONS:

  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  //COMPONENTS:

  //Header component should take care of 1. rendering the name of the course. 

  const Header = ({name}: { name: string}) => (
    <h1>{name}</h1>
  );

  /* Then create a component Part that renders 
  all attributes of each type of course part. 
  Use a switch case-based exhaustive type checking! 
  Use the new component in component Content. */

  const CommonPart = ({part}: {part: CoursePart}) => {
    return (
      <div>
        <h2>
          {part.name} (type: {part.type}, exercises: {part.exerciseCount})
        </h2>
      </div>
    )
  }

  const Description = ({description}: {description: string}) => (
    <i>Description: {description}</i>
  )

  const Part = ({part}: {part: CoursePart}) => {
    switch (part.type) {
      case "normal":
        return(
          <div>
            <CommonPart part={part} />
            <Description description={part.description}/>
          </div>
        );

      case "groupProject":
        return (
          <div>
            <CommonPart part={part} />
            <p>Group project count: {part.groupProjectCount}</p>
          </div>
        );

      case "submission":
        return(
          <div>
            <CommonPart part={part} />
            <Description description={part.description}/>
            <p>Exercise submission link: {part.exerciseSubmissionLink}</p>
          </div>
        );

      case "special":
        return(
          <div>
            <CommonPart part={part} />
            <Description description={part.description}/>
            <div>
              <p>Requirements: {part.requirements.join(", ")}</p>
            </div>
          </div>
        );
      
      default:
        return assertNever(part);
    }
  }

  //Content component should 1.render the names of the different parts and 2.the amount of exercises in each part

  const Content = ({parts}: { parts: CoursePart[] }): JSX.Element => {
    return (
      <div>
        {parts.map(part => (
          <Part key={part.name} part={part}/>
        ))}
      </div>
    )
  };

  //Total component should render the total sum of exercises in all parts.

  const Total = ({parts}: { parts: CoursePart[] }) => {
    return (
      <h2>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </h2>
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