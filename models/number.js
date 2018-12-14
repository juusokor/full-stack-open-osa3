const mongoose = require("mongoose");
const config = require("../config");

const url = config.url;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

personSchema.statics.format = function(number) {
  return {
    name: number.name,
    number: number.number,
    id: number._id
  };
};
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
