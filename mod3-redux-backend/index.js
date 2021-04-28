const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
let deckId;


const axios = require('axios');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())
app.use(cors())


// ***** MAY GET RID OF BELOW FUNCTION IF I CAN MAKE API CALL ON FRONTEND ************

// app.get('/new', (_, res) => {
//   axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=5")
//     .then(function({ data: newDeck }) {
//       console.log(newDeck)
//       res.send(newDeck)
//     })
// })

app.get('/hit', (req, res) => {
  axios.get()
})


app.get('/start', (_, res) => {
  res.json({ message: "hello sam!"})
})

app.listen(port, () => console.log(`listening on port ${port}`))