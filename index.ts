import express from 'express';

const app = express();
const PORT: number = 8000;

app.get('/', (req, res) => {
  res.send('YEA BOIIIIIII');
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
