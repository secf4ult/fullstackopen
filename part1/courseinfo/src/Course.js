import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </div>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ course }) => (
  <p style={{ fontWeight: "bold" }}>
    total of {course.parts.reduce((sum, cur) => (sum += cur.exercises), 0)} exercises
  </p>
);

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total course={course} />
  </div>
);

export default Course;
