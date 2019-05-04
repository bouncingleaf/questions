import { connectDB } from './connect-db';
import { setState } from '../app/store/mutations';

async function deleteQuestion(idToDelete){
  let db = await connectDB();
  await db.collection('questions').deleteOne({id: idToDelete});
  // I wonder if I'm better off deleting from the existing questions array
  let questions = await db.collection('questions');
  setState({questions});
}

export const deleteRoute = app => {
  // Identifies the question to delete, and updates both the database and state
  app.post('/delete', async (req, res) => {    
    let {idToDelete} = req.body.id;
    let db = await connectDB();
    let collection = db.collection(`questions`);
    let question = await collection.findOne({id: idToDelete});
    if (!question) {
      return res.status(500).send("Question not found");
    }
    await deleteQuestion(idToDelete);

    res.status(200).send();
  });
};
