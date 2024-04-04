require('dotenv').config();
import express from 'express';
import { runMigrations, tableExists } from './util/db';
import { TransactionRoutes } from './transactions/transactions.routes';

const app: express.Application = express();

const cors = require("cors")({origin: true});

app.use(express.json());

app.use(cors);

const port = process.env.PORT || 3000;

tableExists("customers").then((res) => !res? runMigrations("create"): "" ).catch(err => {
  console.log(`❌ DB Error`, err);
});

[
  new TransactionRoutes(app)
]

export const createApp = () => app.listen(port, () => {
  return console.log(`✅ Express is listening at http://localhost:${port}`);
});