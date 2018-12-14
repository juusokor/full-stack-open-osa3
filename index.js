const express = require('express')
const morgan = require('morgan')

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('data', req => JSON.stringify(req.body))

app.use(morgan(':method :url :data :status  :res[content-length] - :response-time ms'))

app.get('/api/info', (request, response) => {
  Person.estimatedDocumentCount()
    .then(count => {
      const date = Date()
      response.send(`puhelin luettelossa on ${count} henkilön tiedot<br>${date}`)
    })
    .catch(error => {
      console.log(error)
      response.status(404).end()
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons.map(Person.format))
    })
    .catch(error => {
      console.log(error)
      response.status(404).end()
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(Person.format(person))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name is missing' })
  }
  if (body.number === undefined) {
    return response.status(400).json({ error: 'number is missing' })
  }

  Person.findOne({ name: body.name })
    .then(result => {
      if (result) {
        if (result.name === body.name) {
          response.status(400).send({
            error: `name must be unique. name ${body.name} already exists!`
          })
        }
      } else {
        const person = new Person({
          name: body.name,
          number: body.number
        })

        person
          .save()
          .then(savedNumber => {
            response.json(Person.format(savedNumber))
            console.log(Person.format(savedNumber))
          })
          .catch(error => {
            console.log(error)
            response.status(404).end()
          })
      }
    })
    .catch(error => {
      console.log(error)
      response.status(404).end()
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(Person.format(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformed id' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
