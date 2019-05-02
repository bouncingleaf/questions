import { defaultState } from './defaultState';
import { connectDB } from './connect-db';
import csv from 'csvtojson';
import path from 'path';
import uuid from 'uuid';

async function initializeDB() {
  const csvfile = path.resolve(__dirname,'../data','questions.csv');
  let db = await connectDB();

  // Only initialize if it's empty, e.g., (default user not found)
  let user = await db.collection(`users`).findOne({id:"U1"});
  if (!user) {
    console.log('Updating the database...');

    // Update the questions
    let jsonArray = await csv().fromFile(csvfile);
    let questions = db.collection("questions");

    jsonArray = jsonArray.map((question) => {
      try {
        // Add an identifier and break up the distractors
        question['id'] = uuid();
        question['distractors'] = question.distractors.split('#');
      }
      catch (e) {
        console.log('Could not update question', question);
      }
      return question;
    });

    // pass insertMany an array, and that will be inserted in the db if everything is valid
    await questions.insertMany(jsonArray);

    // Update the users and any other data
    for (let collectionName in defaultState) {
      // collections are: users, groups, tasks, etc.
      let collection = db.collection(collectionName);
      await collection.insertMany(defaultState[collectionName]);
    }
    console.log('Done! Press Ctrl-C to exit.');
    
  }
}

initializeDB();