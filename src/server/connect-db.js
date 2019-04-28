import { MongoClient } from 'mongodb';
const url = `mongodb://localhost:27017/questions`;
let db = null;

export async function connectDB() {
  let client = await MongoClient.connect(url, {useNewUrlParser: true});
  db = client.db();
  return db;
}

// connectDB();