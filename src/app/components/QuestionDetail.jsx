import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

const QuestionDetail = ({
  question,
  setQuestionName,
  setQuestionAnswer,
  setQuestionDistractor
}) => (
  <div className="container">
    <h3>
      Edit Question
    </h3>
    <form className="card p-3">
      <div>
        <label className="col-sm-12 col-md-3 mt-3" htmlFor="questionName">Question</label>
        <input className="col-sm-12 col-md-9" 
          id="questionName"
          onChange={setQuestionName}
          value={question.question} 
          className="form=control"/>
      </div>
      <div>
        <label className="col-sm-12 col-md-3 mt-3" htmlFor="questionAnswer">Correct answer</label>
        <input className="col-sm-12 col-md-9"
          id="questionAnswer"
          onChange={setQuestionAnswer}
          value={question.answer} 
          className="form=control"/>
      </div>
      <div>
        <label className="col-sm-12 col-md-3 mt-3" htmlFor="questionDistractors">Distractors</label>
        {question.distractors.map((distractor, index) => (
          <input className="col-sm-12 col-md-9" 
            id={"distractor" + index}
            onChange={setQuestionDistractor}
            value={distractor}
            key={distractor}
            className="form-control"/>
        ))}
      </div>
      <div className="mt-3">
        <Link className="btn btn-primary btn-sm" to="/dashboard">
            Back to list of questions
        </Link>
      </div>
      <div className="mt-3">
        <button className="btn btn-danger btn-sm">Delete question?</button>
      </div>
    </form>
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
      console.log('Setting to ', e.target.value);
      dispatch(mutations.setQuestionName(id, e.target.value));
    },
    setQuestionAnswer(e) {
      console.log('Setting to ', e.target.value);
      dispatch(mutations.setQuestionAnswer(id, e.target.value));
    },
    setQuestionDistractor(e) {      
      console.log('Setting to ', e.target.value);
      dispatch(mutations.setQuestionDistractor(id, e.target.value));
    }
  }
}

export const ConnectedQuestionDetail = connect(mapStateToProps, mapDispatchToProps) (QuestionDetail);