import express from 'express';
import { mapOrder } from './utilities/sort.js';

const app = express();
const hostname = 'localhost';
const port = 8017;
app.get('/', (req, res) => {
  res.end('<h1>Hello Worldssa1212ss!</h1><hr>');
});
app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Hello An, I am running at ${hostname}:${port}/`);
});
