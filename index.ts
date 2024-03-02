import express from 'express';
import cors from 'cors';

import config from './config';
import taskRoute from './src/routes/TaskRoutes';

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api', taskRoute);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);