const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;

const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.get('/new', (_, res) => {
  axios.get("https://deckofcardsapi.com/api/deck/new")
    .then(function({ data: newDeck }) {
      console.log(newDeck)
      res.send(newDeck)
    })
})


app.get('/start', (_, res) => {
  res.json({ message: "hello sam!"})
})

app.listen(port, () => console.log(`listening on port ${port}`))