import express = require('express');
import {bmiCalculator} from './bmiCalculator';
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});