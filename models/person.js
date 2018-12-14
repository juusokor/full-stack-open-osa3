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
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
