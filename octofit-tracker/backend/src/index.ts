import express from 'express';
import db from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' });
});

app.listen(port, () => {
  console.log(`Backend server listening on http://0.0.0.0:${port}`);
});
