import { defaultState } from './defaultState';
import { connectDB } from './connect-db';

async function initializeDB() {
  let db = await connectDB();
  // Only initialize if there are no users (default user not found)
  let user = await db.collection(`users`).findOne({id:"U1"});
  if (!user) {
    for (let collectionName in defaultState) {
      // collections are: users, groups, tasks, etc.
      let collection = db.collection(collectionName);
      // pass insertMany an array, and that will be inserted in the db if everything is valid
      await collection.insertMany(defaultState[collectionName]);
    }  
  }
}

initializeDB();