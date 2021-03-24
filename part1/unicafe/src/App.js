import React, { useState } from "react";

const Feedback = ({ feedbackHandlers }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <ul>
        <Button text="good" handleClick={feedbackHandlers.addGood} />
        <Button text="neutral" handleClick={feedbackHandlers.addNeutral} />
        <Button text="bad" handleClick={feedbackHandlers.addBad} />
      </ul>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ feedbacks }) => (
  <div>
    <h1>statistics</h1>
    <table>
      <tbody>
        {feedbacks[3].number !== 0 ? (
          feedbacks.map((feedback, i) => (
            <Statistic
              text={feedback.category}
              value={feedback.number}
              key={i}
            />
          ))
        ) : (
          <tr>
            <td>"No feedback given"</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const sum = good + neutral + bad;
  const average = (good * 1 - bad * 1) / (good + bad) || 0;
  const positive = good / sum || 0;

  const feedbacks = [
    { category: "good", number: good },
    { category: "neutral", number: neutral },
    { category: "bad", number: bad },
    { category: "all", number: sum },
    { category: "average", number: average.toFixed(2) },
    { category: "positive", number: positive.toFixed(2) + "%" },
  ];
  const feedbackHandlers = {
    addGood: () => setGood(good + 1),
    addNeutral: () => setNeutral(neutral + 1),
    addBad: () => setBad(bad + 1),
  };

  return (
    <div>
      <Feedback feedbackHandlers={feedbackHandlers} />
      <Statistics feedbacks={feedbacks} />
    </div>
  );
};

export default App;
