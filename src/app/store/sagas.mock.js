/*
 * All of our real sagas will be communicating with the server
 * This lets us mock out the behavior for development and testing purposes 
 */

import {
  put,
  select,
  take
} from 'redux-saga/effects';
import uuid from 'uuid';
import * as mutations from './mutations';

export function* taskCreationSaga(){
  while (true) {
    // Get the group ID from the task creation request
    const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
    // default owner ID, for now
    const ownerID = 'U1';
    // Get a random taskID from uuid
    const taskID = uuid();
    // Actually create the task:
    yield put(mutations.createTask(taskID, groupID, ownerID))
  }
}