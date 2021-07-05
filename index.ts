import express = require('express');
import calculateBMI = require('./bmiCalculator');
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  console.dir(req.query);
  if(req.query.weight && req.query.height) {
    try {
      const { weightInKg, heightInCm, bmi } = calculateBMI(Number(req.query.weight), Number(req.query.height));
      res.status(200).send({
        weightInKg,
        heightInCm,
        bmi
      }).json()
    } catch(err) {
      res.status(400).send({
        error: err.message
      }).json()
    }
  } else {
    res.status(400).send({
      error: 'malformatted perameters'
    }).json()
  }
})

const PORT: number = 3003;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})