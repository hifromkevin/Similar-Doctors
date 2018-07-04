const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const port = 3001;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

const dbAddress = process.env.DB_ADDRESS || 'localhost:27017';
mongoose.connect(`mongodb://${dbAddress}/similarDoctors`);

app.get('/doctors', (req, res) => {
  db.findAll((err, results) => {
    if (err) {
      res.send(404).send('Error, cannot find all doctors');
    } else {
      res.json(results);
    }
  });
});

app.get('doctors/:areaOfPractice', (req, res) => {
  console.log('id!!!', req.params.areaOfPractice)
  db.findSimilarDocs(req.params.areaOfPractice, (err, results) => {
    if (err) {
      res.send(404).send('Cannot find doctors by practice area');
    } else {
      res.json(results);
    }
  });
})

app.listen(port, () => console.log(`Listening on ${port}!`));