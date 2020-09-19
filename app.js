// import express
const express = require('express');

// npm package to allow cross origin resource sharing
const cors = require('cors');

// Built in bodyParser middleware to be able to capture data coming via a form.
// body-parse parses incoming request bodies in a middleware before your handlers,
// available under the req.body property.
// TLDR: makes your forms work
const bodyParser = require('body-parser');

// henseforth, the express app is known as app
const app = express();

// The location where queries are kept
const db = require('./queries')

// server configuration
const port = process.env.PORT || 3001;

const { DATABASE_URL } = process.env;

app.use(cors())

app.get('/', (req, res) => {
  res.json({ info: 'twohueleaderboard' })
})

app.get('/players', db.getPlayers)
app.get('/players/:id', db.getPlayerById)
app.post('/players', db.createPlayer)
app.put('/players/:id', db.updatePlayer)
app.delete('/players/:score', db.deletePlayer)



// **********************************
// app.uses
// **********************************
app.use(cors())
app.use(bodyParser.json());



// Error Handlers
app.use((err, req, res, next) => {
  res.json(err);
  res.status(500).send('Oh no a 500 error')
});


app.use((req, res, next) => {
  res.status(404).send(`404 error. I can't find that.`)
});


app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})

module.exports = app;
