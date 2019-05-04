import { put, take } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';
import * as mutations from './mutations';
import {history} from './history';

const url = process.env.NODE_ENV == 'production' ? '' : 'http://localhost:7777';

export function* questionCreationSaga(){
  while (true) {
    // Get the question text from the creation request:
    const {text} = yield take(mutations.REQUEST_QUESTION_CREATION);
    // Get a random questionID from uuid
    const questionID = uuid();
    // Actually create the question:
    yield put(mutations.createQuestion(questionID, text));
    const {res} = yield axios.post(url + `/question/new`,{
      question: {
        id: questionID,
        question: text
      }
    });
  }
}

export function* questionDeletionSaga(){
  while (true) {
    // Get the question id:
    const {questionID} = yield take(mutations.REQUEST_QUESTION_DELETION);
    // Actually delete the question:
    yield put(mutations.deleteQuestion(questionID));
    const {res} = yield axios.post(url + `/delete`,{
      question: {
        id: questionID,
      }
    });
  }
}

export function* questionModificationSaga(){
  while (true) {
    const question = yield take([
      mutations.SET_QUESTION_NAME,
      mutations.SET_QUESTION_ANSWER,
      mutations.SET_QUESTION_DISTRACTORS
    ]);
    const {res} = yield axios.post(url + `/question/update`,{
      question: {
        id: question.questionID,
        question: question.question,
        answer: question.answer,
        distractors: question.distractors
      }
    });
  }
}

export function* userAuthenticationSaga(){
  while (true) {
    const {username, password} = yield take(mutations.REQUEST_AUTHENTICATE_USER);
    try {
      const {data} = yield axios.post(url + `/authenticate`, {username, password});
      if (!data) {
        throw new Error();
      }

      console.log('Authenticated!', data);
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
      history.push('/dashboard');

    } catch (e) {
      console.log('Problem with authentication');
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
    }
  }
}