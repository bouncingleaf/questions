import { applyMiddleware, createStore, combineReducers } from 'redux';
// import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { defaultState } from '../../server/defaultState';
import * as sagas from './sagas';
import * as mutations from './mutations';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    session(userSession = defaultState.session || {}, action) {
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
            name: "New question",
            group: action.groupID,
            owner: action.ownerID,
            isComplete: false
          }];
        case mutations.SET_QUESTION_NAME:
          return questions.map(question => {
            return (question.id === action.questionID) ?
              {...question, isComplete: action.isComplete} :
              question;
          })
        case mutations.SET_QUESTION_ANSWER:
          return questions.map(question => {
            return (question.id === action.questionID) ?
              {...question, group: action.groupID} :
              question;
          })
        case mutations.SET_QUESTION_DISTRACTOR:
          return questions.map(question => {
            return (question.id === action.questionID) ?
              {...question, name: action.name} :
              question;
          })
      }
      return questions;
    },
    tasks(tasks = [], action) {
      switch(action.type) {
        case mutations.SET_STATE:
          return action.state.tasks;
        case mutations.CREATE_TASK:
          return [...tasks, {
            id: action.taskID,
            name: "New task",
            group: action.groupID,
            owner: action.ownerID,
            isComplete: false
          }];
        case mutations.SET_TASK_COMPLETE:
          return tasks.map(task => {
            return (task.id === action.taskID) ?
              {...task, isComplete: action.isComplete} :
              task;
          })
        case mutations.SET_TASK_GROUP:
          return tasks.map(task => {
            return (task.id === action.taskID) ?
              {...task, group: action.groupID} :
              task;
          })
        case mutations.SET_TASK_NAME:
          return tasks.map(task => {
            return (task.id === action.taskID) ?
              {...task, name: action.name} :
              task;
          })
      }
      return tasks;
    },
    comments(comments = []) {
      return comments;
    },
    groups(groups = [], action) {
      switch(action.type) {
        case mutations.SET_STATE:
          return action.state.groups;
      }
      return groups;
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