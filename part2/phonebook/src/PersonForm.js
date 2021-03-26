import React from "react";

const PersonForm = ({
  submitNewName,
  newName,
  newNumber,
  handleNameInput,
  handleNumberInput,
}) => {
  return (
    <form onSubmit={submitNewName}>
      <div>
        name: <input value={newName} onChange={handleNameInput} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
