import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const mostVoteIndex = votes.reduce(
    (iMax, vote, i, arr) => (vote > arr[iMax] ? i : iMax),
    0
  );

  const nextAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));
  const addVote = () => {
    const copy = [...votes];
    copy[selected] = votes[selected] + 1;

    setVotes(copy);
  };

  return (
    <div>
      <section>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
        <button onClick={addVote}>vote</button>
        <button onClick={nextAnecdote}>next anecdote</button>
      </section>
      <section>
        <h1>Anecdote with most votes</h1>
        <Anecdote
          anecdote={anecdotes[mostVoteIndex]}
          vote={votes[mostVoteIndex]}
        />
      </section>
    </div>
  );
};

const Anecdote = ({ anecdote, vote }) => (
  <>
    <h1>{anecdote}</h1>
    <p>has {vote} votes</p>
  </>
);

export default App;
