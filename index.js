const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

morgan.token("data", function getData(req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :data :status  :res[content-length] - :response-time ms")
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
];

app.get("/info", (req, res) => {
  const count = persons.length;
  const date = Date();
  res.send("puhelin luettelossa on " + count + " henkilön tiedot<br>" + date);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const randomId = Math.floor(Math.random() * (9000000 - 1) + 1);
  return randomId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "name is missing" });
  }
  if (body.number === undefined) {
    return response.status(400).json({ error: "number is missing" });
  }
  if (persons.find(e => e.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique. name " + body.name + " is already in list."
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
