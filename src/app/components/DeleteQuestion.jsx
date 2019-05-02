import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

const DeleteQuestion = ({id, question}) => (
  <div>
    <div>
      Delete this question?
      <div>
        {question.question}
      </div>
    </div>
        <Link to={`/question/${id}`} className="nav-link">Cancel</Link>
        <Link to="/add" className="nav-link">Delete it</Link>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  // Get the ID from the url parameters
  let id = ownProps.match.params.id;
  // Get the question by finding a question that matches that ID
  let question = state.questions.find(question => question.id === id);

  return {id, question};
}

export const ConnectedDeleteQuestion = connect(mapStateToProps) (DeleteQuestion);
