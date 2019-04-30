import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { requestTaskCreation } from '../store/mutations';

export const TaskList = ({tasks, name, id, createNewTask}) => (
    <div className="card p-2 m-2">
      <h3>
        {name}
      </h3>
      <div>
          {tasks.map(task => (
            <Link to={`/task/${task.id}`} key={task.id}>
              <div className="card mt-2 p-2">
              {task.name} -- {task.isComplete ? 'DONE!' : 'not done'}
              </div>
            </Link>
          ))}
      </div>
      <button className="btn btn-primary btn-block mt-2" onClick={() => createNewTask(id)}>
        Add New
      </button>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let groupID = ownProps.id;
    return {
        name: ownProps.name,
        id: groupID,
        tasks: state.tasks.filter(task => task.group === groupID)
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      createNewTask(id) {
        dispatch(requestTaskCreation(id));
      }
    }
}

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps) (TaskList);