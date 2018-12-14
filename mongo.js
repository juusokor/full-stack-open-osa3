const mongoose = require("mongoose");
const config = require("./config");

const url = config.url;

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

addNumberToDB = (name, num) => {
  const new_number = new Person({
    name: name,
    number: num
  });
  mongoose.connect(url);
  new_number.save().then(response => {
    console.log("lisätään henkilö", name, "numero", num, "luetteloon");
    mongoose.connection.close();
  });
};

findAll = () => {
  mongoose.connect(url);
  Person.find({}).then(result => {
    console.log("puhelinluettelo:");
    result.forEach(element => {
      console.log(element.name, element.number);
    });
    mongoose.connection.close();
  });
};

args = process.argv;

if (args.length === 2) {
  const list = findAll();
} else if (args.length === 4) {
  addNumberToDB(args[2], args[3]);
  console.log(args[2], args[3]);
} else {
  console.log(
    "Invalid number of command line arguments. Only 0 or 2 command line arguments accepted."
  );
}
