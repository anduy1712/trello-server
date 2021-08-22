import { MongoClient } from 'mongodb';
import { env } from './environtment';
//eNRZaE2QgcXmIxLu

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  try {
    //connect
    await client.connect();
    console.log('Connect successfully to server');

    //list databases
    await listDatabases(client);
  } finally {
    //close
    await client.close();
  }
};

const listDatabases = async (client) => {
  const databasesList = await client.db().admin().listDatabases();
  console.log(databasesList);
  console.log('Your databases');
  databasesList.databases.forEach((db) => console.log(`---${db.name}`));
};
