import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as sagas from './sagas';
import * as mutations from './mutations';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    session(userSession = {}, action) {
      let {type, authenticated, session} = action;
      switch(type) {
        case mutations.SET_STATE:
          return {...userSession, id: action.state.session.id}
        case mutations.REQUEST_AUTHENTICATE_USER:
          return {...userSession, authenticated: mutations.AUTHENTICATING};
        case mutations.PROCESSING_AUTHENTICATED_USER:
          return {...userSession, authenticated};
        default:
          return userSession;
      }
    },
    questions(questions = [], action) {
      switch(action.type) {
        case mutations.SET_STATE:
          return action.state.questions;
        case mutations.CREATE_QUESTION:
          return [...questions, {
            id: action.questionID,
            question: "New question",
            answer: action.answer,
            distractors: action.distractors
          }];
        case mutations.DELETE_QUESTION:
          return [...questions.filter(id !== action.questionID)];
        case mutations.SET_QUESTION_NAME:
          return questions.map(question => {
            return (question.id === action.questionID) ?
              {...question, question: action.question} :
              question;
          })
        case mutations.SET_QUESTION_ANSWER:
          return questions.map(question => {
            return (question.id === action.questionID) ?
              {...question, answer: action.answer} :
              question;
          })
        case mutations.SET_QUESTION_DISTRACTORS:
          return questions.map(question => {
            return (question.id === action.questionID) ?
              {...question, distractors: action.distractors} :
              question;
          })
      }
      return questions;
    },
    users(users = []) {
      return users;
    }
  }),
  applyMiddleware(sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
};