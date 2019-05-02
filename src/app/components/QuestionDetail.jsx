import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

const QuestionDetail = ({
  question,

  setQuestionName,
  setQuestionAnswer,
  setQuestionDistractors
}) => (
  <div className="card p-3 col-6">
    <div>
    	<input onChange={setQuestionName} value={question.question} 
        className="form=control form-control-lg"/>
    </div>
    <div>
    	<input onChange={setQuestionAnswer} value={question.answer} 
        className="form=control form-control-lg"/>
    </div>
    <div>
      <Link to="/dashboard">
          <button className="btn btn-primary mt-2">Back to list of questions</button>
      </Link>
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  // Get the ID from the url parameters
  let id = ownProps.match.params.id;
  // Get the question by finding a question that matches that ID
  let question = state.questions.find(question => question.id === id);

  return {question};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setQuestionName(e) {
      // dispatch(mutations.setQuestionCompletion(id, isComplete));
    },
    setQuestionAnswer(e) {
      // dispatch(mutations.setQuestionGroup(id, e.target.value));
    },
    setQuestionDistractors(e) {
      // dispatch(mutations.setQuestionName(id, e.target.value));
    }
  }
}

export const ConnectedQuestionDetail = connect(mapStateToProps, mapDispatchToProps) (QuestionDetail);