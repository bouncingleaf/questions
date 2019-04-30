import { defaultState } from './defaultState';
import { connectDB } from './connect-db';
import csv from 'csvtojson';
import path from 'path';

async function initializeDB() {
  const csvfile = path.resolve(__dirname,'../data','questions.csv');
  let db = await connectDB();

  // Only initialize if it's empty, e.g., (default user not found)
  let user = await db.collection(`users`).findOne({id:"U1"});
  if (!user) {

    // Update the questions
    console.log('Converting the CSV...');
    const jsonArray = await csv().fromFile(csvfile);
    let questions = db.collection("questions");
    // pass insertMany an array, and that will be inserted in the db if everything is valid
    console.log('Inserting the questions into the database...');
    await questions.insertMany(jsonArray);

    // Update the users and any other data
    console.log('Adding other application info to the database...');
    for (let collectionName in defaultState) {
      // collections are: users, groups, tasks, etc.
      let collection = db.collection(collectionName);
      await collection.insertMany(defaultState[collectionName]);
    }
    console.log('Done!');
    
  }
}

initializeDB();