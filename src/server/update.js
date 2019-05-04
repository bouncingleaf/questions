import { connectDB } from './connect-db';

async function updateQuestion(question){
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

export const updateRoute = app => {
  app.post('/question/update', async (req, res) => {
    // body is the data passed in with the request
    let question = req.body.question;
    await updateQuestion(question);
    res.status(200).send()
  });
};
