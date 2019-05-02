import React from 'react';
import { connect } from 'react-redux';
// import { ConnectedTaskList } from './TaskList';
import { ConnectedQuestionList } from './QuestionList';

const Dashboard = () => (
  // const Dashboard = ({groups}) => (
  <div>
    {/* <div className="row">
      {groups.map(group => (
          <ConnectedTaskList key={group.id}
              id={group.id} name={group.name}
              className="col"/>
      ))}
    </div> */}
    <ConnectedQuestionList />
  </div>
);

const mapStateToProps = (state) => {
    // return {
    //     groups: state.groups
    // }
    return state;
}

export const ConnectedDashboard = connect(mapStateToProps) (Dashboard);