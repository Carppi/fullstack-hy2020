import express from 'express';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
// based on course material for flight diary: https://fullstackopen.com/en/part9/typing_the_express_app
const app = express();
import cors from 'cors';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);

app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});