import express from 'express';
import { connectDB } from './configs/mongodb.js';
import { env } from './configs/environtment.js';
const app = express();

connectDB().catch(console.log);

app.get('/', (req, res) => {
  res.end('<h1>Hello Worldssa1212ss!</h1><hr>');
});
app.listen(env.PORT, env.HOST, () => {
  console.log(`Hello An, I am running at ${env.HOST}:${env.PORT}/`);
});
