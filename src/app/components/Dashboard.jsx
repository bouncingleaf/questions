import React from 'react';
import { connect } from 'react-redux';
import { ConnectedQuestionList } from './QuestionList';

const Dashboard = () => (
  <div>
    <ConnectedQuestionList />
  </div>
);

const mapStateToProps = (state) => state;

export const ConnectedDashboard = connect(mapStateToProps) (Dashboard);