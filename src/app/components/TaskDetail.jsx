import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const TaskDetail = ({
  id,
  comments,
  task,
  isComplete,
  groups
}) => (
  <div>
    <h2>{task.name}</h2>
    <div>
      <button>Complete/Re-open task</button>
    </div>
    <div>
      <select name="" id="">
        {groups.map(group => (
          <option key="{group.id}" value="{group.id}">{group.name} {group.id}</option>
        ))}
      </select>
    </div>
    <Link to="/dashboard">
        <button>
          Done
        </button>
    </Link>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find(task => task.id === id);
  let groups = state.groups;

  return {
    id,
    task,
    groups,
    isComplete:task.isComplete
  };
}

export const ConnectedTaskDetail = connect(mapStateToProps) (TaskDetail);