import {
  put,
  select,
  take
} from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';
import * as mutations from './mutations';

const url = "http://localhost:7777";

export function* taskCreationSaga(){
  while (true) {
    // Get the group ID from the task creation request
    const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
    // default owner ID, for now
    const ownerID = 'U1';
    // Get a random taskID from uuid
    const taskID = uuid();
    // Actually create the task:
    yield put(mutations.createTask(taskID, groupID, ownerID));
    const {res} = yield axios.post(url + `/task/new`,{
      task: {
        id: taskID,
        group: groupID,
        owner: ownerID, 
        isComplete: false,
        name: "a new task"
      }
    });
    console.info("new: Got response", res);
  }
}

export function* taskModificationSaga(){
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETE
    ]);
    const {res} = yield axios.post(url + `/task/update`,{
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete
      }
    });
    console.info("modification: Got response", res);
  }
}