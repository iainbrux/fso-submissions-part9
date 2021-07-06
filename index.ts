import express = require('express');
import calculateBMI from './bmiCalculator';
import { calculateExercises, WorkoutInput } from './exerciseCalculator';
const app = express();

app.use(express.json()); // to console.log req.body!

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.dir(req.query);
  if(req.query.weight && req.query.height) {
    try {
      const { weightInKg, heightInCm, bmi } = calculateBMI(Number(req.query.weight), Number(req.query.height));
      res.status(200).send({
        weightInKg,
        heightInCm,
        bmi
      }).json();
    } catch(err) {
      if (err instanceof Error) {
        res.status(400).send({
          error: err.message
        }).json();
      }
    }
  } else {
    res.status(400).send({
      error: 'malformatted perameters'
    }).json();
  }
  res.status(400).send({
    error: 'malformatted perameters'
  }).json();
});

app.post('/exercises', (req, res) => {
  const { target, workouts }: WorkoutInput = req.body;
  const responseBody = calculateExercises(target, workouts);
  console.log(responseBody);
  res.status(201)
    .send(responseBody)
    .json();
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});