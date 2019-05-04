require('dotenv').config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import './initialize-db';
import { authenticationRoute } from './authenticate';
import { deleteRoute } from './delete';
import { newRoute } from './new';
import { updateRoute } from './update';

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
newRoute(app);
updateRoute(app);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('/*', (req,res) => {
    res.sendFile(path.resolve('index.html'));
  });
}
