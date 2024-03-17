require('dotenv').config();
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

//app.use('/v1', (req, res, next) => v1App(req, res, next));

app.listen(port, () => {
  return console.log(`✅ Express is listening at http://localhost:${port}`);
});