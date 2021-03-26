import React, { useState, useEffect } from "react";
import PersonForm from "./PersonForm";
import SearchFilter from "./SearchFilter";
import Persons from "./Persons";
import Notification from "./Notification";

import api from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState();

  useEffect(() => {
    api.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleNameInput = (e) => setNewName(e.target.value);
  const handleNumberInput = (e) => setNewNumber(e.target.value);
  const handleFilterInput = (e) => {
    setFilter(e.target.value);
  };
  const handleDeletePerson = (name, id) => (e) =>
    // eslint-disable-next-line no-restricted-globals
    confirm(`Delete ${name}`) &&
    api
      .remove(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)))
      .catch(() => {
        setMessage({
          type: "error",
          info: `Information of ${name} has already been removed from server`,
        });
        setTimeout(() => setMessage(), 2000);
      });

  const submitNewName = (e) => {
    e.preventDefault();

    const newPerson = { name: newName, number: newNumber };
    const exists = persons.findIndex((val) => val.name === newName);

    if (exists === -1) {
      api
        .create(newPerson)
        .then((person) => setPersons(persons.concat(person)))
        .then(() => {
          setMessage({
            info: `Added ${newName}`,
            type: "success",
          });
          setTimeout(() => setMessage(), 2000);
        });
    } else {
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`
      ) &&
        api
          .update(persons[exists].id, newPerson)
          .then((data) =>
            setPersons(
              persons.map((person) => (person.id === data.id ? data : person))
            )
          );
    }
  };

  const PersonFormProps = {
    newName,
    handleNameInput,
    newNumber,
    handleNumberInput,
    submitNewName,
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <SearchFilter filter={filter} handleFilterInput={handleFilterInput} />

      <h1>add a new</h1>
      <PersonForm {...PersonFormProps} />

      <h1>Numbers</h1>
      <ul>
        <Persons
          persons={persons}
          filter={filter}
          deletePerson={handleDeletePerson}
        />
      </ul>
    </div>
  );
};

export default App;
