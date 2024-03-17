require('dotenv').config();
import express from 'express';
import { runMigrations, tableExists } from './util/db';

const app = express();
const port = process.env.PORT || 3000;

tableExists("customers").then((res) => !res? runMigrations("create"): "" ).catch(err => {
  console.log(`❌ DB Error`, err);
});

app.listen(port, () => {
  return console.log(`✅ Express is listening at http://localhost:${port}`);
});