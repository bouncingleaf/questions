import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { defaultState } from '../../server/defaultState';
import { taskCreationSaga } from './sagas.mock';
import * as mutations from './mutations';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    tasks(tasks = defaultState.tasks, action) {
      switch(action.type) {
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
            return (task.id === action.taskID) ? {...task, isComplete: action.isComplete} : task;
          })
      }
      return tasks;
    },
    comments(comments = defaultState.comments) {
      return comments;
    },
    groups(groups = defaultState.groups) {
      return groups;
    },
    users(users = defaultState.users) {
      return users;
    }
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

sagaMiddleware.run(taskCreationSaga);
