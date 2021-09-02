import express from 'express';
import cors from 'cors';
import { connectDB } from './configs/mongodb.js';
import { apiV1 } from './routes/v1/index.js';
import { corsOptions } from './configs/cors.js';

connectDB()
  .then(() => console.log('Connected Successfully'))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  app.use(cors(corsOptions));

  //Enabled req body
  app.use(express.json());

  //Use API v1
  app.use('/v1', apiV1);

  // app.listen(env.APP_PORT, env.HOST, () => {
  //   console.log(`Hello An, I am running at ${env.APP_HOST}:${env.APP_PORT}/`);
  // });
  //Support deploy heroku
  app.listen(process.env.PORT, () => {
    console.log(`Hello An, I am running at port :${process.env.PORT}/`);
  });
};
