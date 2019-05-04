import { connectDB } from './connect-db';

async function addNewQuestion(question) {
  let db = await connectDB();
  let collection = db.collection(`questions`);
  await collection.insertOne(question);
}

export const newRoute = app => {
  app.post('/question/new', async (req, res) => {
    // body is the data passed in with the request
    let question = req.body.question;
    await addNewQuestion(question);
    res.status(200).send()
  });  
}
