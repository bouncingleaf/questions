import { connectDB } from './connect-db';
import { setState } from '../app/store/mutations';

const authenticationTokens = [];

async function removeQuestionFromState(idToDelete){
  let db = await connectDB();
  await db.collection('questions').deleteOne({id: idToDelete});
  // I wonder if I'm better off deleting from the existing questions array
  let questions = await db.collection('questions');
  
  // I wonder if this needs to be in a saga instead
  setState({questions});
}

// router.post("/adminDeleteCard/:deckId/:cardId", adminCards.saveCardDelete)

export const deleteRoute = app => {
  // Identifies the question to delete, and updates both the database and state
  app.post('/delete', async (req, res) => {    
    let {idToDelete} = req.body;
    let db = await connectDB();
    let collection = db.collection(`questions`);
    let question = await collection.findOne({id: idToDelete});
    if (!question) {
      return res.status(500).send("Question not found");
    }
 
    let state = await removeQuestionFromState(idToDelete);

    res.send({state});
  });
}