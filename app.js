// import express
const express = require('express');

// npm package to allow cross origin resource sharing
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

// The location where queries are kept
const db = require('./queries');

// server configuration
const port = process.env.PORT || 3001;

// **********************************
// app.uses
// **********************************
// according to docs, this should enable all CORS requests-
// but I get an error sometimes (but not always)
app.use(cors());

// replaces body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', cors(corsOptions), (req, res) => {
app.get('/', (req, res) => {
  res.json({ info: 'Hello from twohueleaderboard api 😎' });
});

app.get('/players', db.getPlayers);
app.get('/players/:id', db.getPlayerById);
app.post('/players', db.createPlayer);
app.put('/players/:id', db.updatePlayer);
app.delete('/players/:id', db.deletePlayer);

// Error Handlers
app.use((req, res, next) => {
  res.status(404).json(`404 error. I can't find that.`);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json('Status 500. Something broke.');
});


app.listen(port, () => {
  console.log(`server running at http://localhost: ${port}`);
});

module.exports = app;
