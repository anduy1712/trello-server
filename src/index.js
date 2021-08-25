import express from 'express';
import { connectDB } from './configs/mongodb.js';
import { env } from './configs/environtment.js';
import { apiV1 } from './routes/v1/index.js';

connectDB()
  .then(() => console.log('Connected Successfully'))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  //Enabled req body 
  app.use(express.json());

  //Use API v1
  app.use('/v1', apiV1);

  app.listen(env.APP_PORT, env.HOST, () => {
    console.log(`Hello An, I am running at ${env.APP_HOST}:${env.APP_PORT}/`);
  });
};
