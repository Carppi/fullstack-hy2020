import express from 'express';
// based on course material for flight diary: https://fullstackopen.com/en/part9/typing_the_express_app
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});