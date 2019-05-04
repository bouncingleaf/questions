import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

const DeleteQuestion = ({id, question}) => (
  <div className="card p-2 m-2 col-sm-12 col-md-8">
    <div>
      <h3>
        Delete this question?
      </h3>
      <ul className="list-group card p-2 m-2">
        <li className="list-group-item">
          Question: {question.question}
        </li>
        <li className="list-group-item">
          Correct Answer: {question.answer}
        </li>
        <li className="list-group-item">
          Distractors: {question.distractors.join(',')}
        </li>
      </ul>
    </div>
        <Link to={`/dashboard`}>
          <button className="btn btn-sm btn-primary mt-2">Cancel</button>
        </Link>
        <Link to={`/delete/${id}`}>
          <button className="btn btn-sm btn-danger mt-2">Delete it</button>
        </Link>
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
