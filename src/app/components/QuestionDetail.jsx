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
  <form className="card p-3">
    <div>
      <label htmlFor="questionName">Question</label>
      <input 
        id="questionName"
        onChange={setQuestionName}
        value={question.name} 
        className="form=control"/>
    </div>
    <div>
      <label htmlFor="questionAnswer">Correct answer</label>
      <input
        id="questionAnswer"
        onChange={setQuestionAnswer}
        value={question.answer} 
        className="form=control"/>
    </div>
    <div>
      <label htmlFor="questionDistractors">Distractors</label>
      {question.distractors.map((distractor, index) => (
        <input 
          id={"distractor" + index}
          onChange={setQuestionDistractor}
          value={distractor}
          key={distractor}
          className="form-control"/>
      ))}
    </div>
    <div>
      <Link to="/dashboard">
          Back to list of questions
      </Link>
    </div>
    <div>
      <Link to="/delete/${question.id}">
          Delete this question
      </Link>
    </div>
  </form>
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