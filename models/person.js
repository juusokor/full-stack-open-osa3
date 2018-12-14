const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const url = process.env.MONGODB_URI;
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
