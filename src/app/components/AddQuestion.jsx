import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

const AddQuestion = ({question}) => (
  <div className="container">
    <h3>
      Add Question
    </h3>
    <form>
      <div className="form-group">
        <label htmlFor="questionName">Question</label>
        <input
          id="questionName"
          value={question.question} 
          className="form=control" />
      </div>
      <div className="form-group">
        <label htmlFor="questionAnswer">Correct answer</label>
        <input
          id="questionAnswer"
          value={question.answer} 
          className="form=control" />
      </div>
      <div className="form-group">
        <label>Distractors</label>
        {question.distractors.map((distractor, index) => (
          <span>
            <input
              id={"distractor" + index}
              value={distractor}
              key={distractor}
              className="form-control" />
            <button className="btn btn-sm btn-primary mt-2">
              +
            </button>
            <button className="btn btn-sm btn-primary mt-2">
              -
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
        <Link to="/new">
          <button className="btn btn-primary btn-sm">
            Save
          </button>
        </Link>
      </div>
    </form>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  // Start with a blank question
  let question = {};
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

export const ConnectedAddQuestion = connect(mapStateToProps, mapDispatchToProps) (AddQuestion);