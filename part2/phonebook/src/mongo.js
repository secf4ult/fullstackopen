const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://phonebook:${password}@cluster0.9erld.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("person", PersonSchema);

if (!name && !number) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
if (name && number) {
  const newPerson = new Person({
    name,
    number,
  });

  newPerson
    .save()
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((e) => {
      console.log(e);
      mongoose.connection.close();
    });
}
