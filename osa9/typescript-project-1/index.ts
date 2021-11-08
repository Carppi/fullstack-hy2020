import express = require('express');
import {bmiCalculator} from './bmiCalculator';
import {calculateExercises} from'./exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const q = req.query;
  const height = Number(q.height);
  const weight = Number(q.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    res.send({
      weight: weight,
      height: height,
      bmi: bmiCalculator(height, weight)
    });
  } else {
    res.status(400).send({
      message: 'Provided values were not two numbers! Please use the following format http://localhost:3003/bmi?height=180&weight=72'
    });
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/exercises', (req: any, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  console.log("req",req.body);
  //console.log("res", res);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const body = req.body;
  if(!body) {
    res.status(400).send({
      message: 'Request body has not been defined! Please deliver target and daily_exercises as part of the body in JSON'
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const exercises = body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target = body.target;
  if(!exercises ||!target) {
    res.status(400).send({
      message: 'parameters missing'
    });
  }
  try {
    res.send(calculateExercises(target, exercises));
  } catch (e) {
    res.status(400).send({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      message: e.message
    });
  }
  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});