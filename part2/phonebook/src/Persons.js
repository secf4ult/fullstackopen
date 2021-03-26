const Persons = ({ persons, filter, deletePerson }) => {
  return persons.map((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()) ? (
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={deletePerson(person.name, person.id)}>delete</button>
      </li>
    ) : undefined
  );
};

export default Persons;
