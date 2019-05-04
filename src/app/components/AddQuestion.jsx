import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

const EditQuestion = ({
  question,
  setQuestionName,
  setQuestionAnswer,
  setQuestionDistractor
}) => (
  <div className="container">
    <h3>
      Add Question
    </h3>
    <form>
      <div className="form-group">
        <label htmlFor="questionName">Question</label>
        <input
          id="questionName"
          onChange={setQuestionName}
          value={question.question} 
          className="form=control" />
      </div>
      <div className="form-group">
        <label htmlFor="questionAnswer">Correct answer</label>
        <input
          id="questionAnswer"
          onChange={setQuestionAnswer}
          value={question.answer} 
          className="form=control" />
      </div>
      <div className="form-group">
        <label>Distractors</label>
        {question.distractors.map((distractor, index) => (
          <span>
            <input
              id={"distractor" + index}
              onChange={setQuestionDistractor}
              value={distractor}
              key={distractor}
              className="form-control" />
            <button>
              Add
            </button>
            <button>
              Remove
            </button>
          </span>
        ))}
      </div>
      <div className="mt-3">
        <Link to="/dashboard">
          <button className="btn btn-secondary btn-sm">
            Cancel
          </button>
        </Link>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary btn-sm">
          Add question
        </button>
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

export const ConnectedEditQuestion = connect(mapStateToProps, mapDispatchToProps) (EditQuestion);