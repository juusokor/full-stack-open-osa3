const mongoose = require("mongoose");
const config = require("../config");

const url = config.url;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

personSchema.statics.format = function(name) {
  return {
    name: name.name,
    number: name.number,
    id: name._id
  };
};

personSchema.statics.hasName = function(body) {
  Person.findOne({ name: body.name })
    .then(result => {
      console.log(result.name);
      if (result.name === body.name) {
        const answer = () => {
          True;
        };
        return answer;
      }
      return { False };
    })
    .catch(error => {
      console.log(error);
    });
};

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
