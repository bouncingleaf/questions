require('dotenv').config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { authenticationRoute } from './authenticate';
import { connectDB } from './connect-db';
import { deleteRoute } from './delete';
import './initialize-db';

let port = process.env.PORT || 7777;
let app = express();

app.listen(port, console.log('Server listening on port', port));

app.use(
  cors(),
  bodyParser.urlencoded({extended: true}),
  bodyParser.json()
);

authenticationRoute(app);
deleteRoute(app);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('/*', (req,res) => {
    res.sendFile(path.resolve('index.html'));
  });
}

export const addNewTask = async task => {
  let db = await connectDB();
  let collection = db.collection(`tasks`);
  await collection.insertOne(task);
}

export const updateTask = async task => {
  let { id, group, isComplete, name } = task;
  let db = await connectDB();
  let collection = db.collection(`tasks`);

  if (group) {
    await collection.updateOne({id},{$set:{group}})
  }

  if (name) {
    await collection.updateOne({id},{$set:{name}})
  }

  if (isComplete !== undefined) {
    await collection.updateOne({id},{$set:{isComplete}})
  }
}

export const addNewQuestion = async question => {
  let db = await connectDB();
  let collection = db.collection(`questions`);
  await collection.insertOne(question);
}

export const updateQuestion = async question => {
  let { id, questionName, answer, distractors } = question;
  let db = await connectDB();
  let collection = db.collection(`questions`);

  if (questionName) {
    await collection.updateOne({id},{$set:{question: questionName}})
  }
  if (answer) {
    await collection.updateOne({id},{$set:{answer}})
  }
  if (distractors) {
    await collection.updateOne({id},{$set:{distractors}})
  }
}

app.post('/question/new', async (req, res) => {
  // body is the data passed in with the request
  let question = req.body.question;
  await addNewQuestion(question);
  res.status(200).send()
});

app.post('/question/update', async (req, res) => {
  // body is the data passed in with the request
  let question = req.body.question;
  await updateQuestion(question);
  res.status(200).send()
});

