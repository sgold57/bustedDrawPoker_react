const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;


const axios = require('axios');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())
app.use(cors())

app.get('/new', (_, res) => {
  axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=5")
    .then(function({ data: newDeck }) {
      res.send(newDeck)
    })
})


app.get('/start', (_, res) => {
  res.json({ message: "hello sam!"})
})

app.listen(port, () => console.log(`listening on port ${port}`))