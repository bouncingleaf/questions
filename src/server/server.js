import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

let port = 7777;
let app = express();

app.listen(port, console.log('Server listening on port', port));

// // A simple test:
// app.get('/', (req, res) => {
//   res.send("Hello world!!");
// })

app.use(
  cors(),
  bodyParser.urlencoded({extended: true}),
  bodyParser.json()
);

// export const addNewTask = 

app.post('/task/new/', async (req, res) => {
  // body is the data passed in with the request
  let task = req.body.task;

})