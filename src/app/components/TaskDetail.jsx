import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

const TaskDetail = ({
  id,
  comments,
  task,
  isComplete,
  groups,

  setTaskCompletion
}) => (
  <div>
    <div>
    	<input value={task.name} />
    </div>
    <div>
      <button onClick={() => setTaskCompletion(id, !isComplete)}>{isComplete ? `Reopen this task` : `Complete this task`}</button>
    </div>
    <div>
      <select name="" id="">
        {groups.map(group => (
          <option key={group.id} value={group.id}>{group.name} {group.id}</option>
        ))}
      </select>
    </div>
    <div>
      <Link to="/dashboard">
          <button>Back to list of tasks</button>
      </Link>
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  // Get the ID from the url parameters
  let id = ownProps.match.params.id;
  // Get the task by finding a task that matches that ID
  let task = state.tasks.find(task => task.id === id);
  let groups = state.groups;

  return {
    id,
    task,
    groups,
    isComplete:task.isComplete
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setTaskCompletion(id,isComplete) {
      dispatch(mutations.setTaskCompletion(id, isComplete));
    }
  }
}

export const ConnectedTaskDetail = connect(mapStateToProps, mapDispatchToProps) (TaskDetail);