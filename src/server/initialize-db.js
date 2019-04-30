import { defaultState } from './defaultState';
import { connectDB } from './connect-db';
import csv from 'csvtojson';

async function initializeDB() {
  console.log('init');
  
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


  const csvFilePath='../data/questions.csv';
  // const csv=require('csvtojson')
  csv()
  .fromFile(csvFilePath)
  .then((jsonObj)=>{
	console.log('converted',jsonObj);
	/**
	 * [
	 * 	{a:"1", b:"2", c:"3"},
	 * 	{a:"4", b:"5". c:"6"}
	 * ]
	 */ 
  })

// Async / await usage
// const jsonArray=await csv().fromFile(csvFilePath);
}

initializeDB();