import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestQuestionCreation } from '../store/mutations';

export const QuestionList = ({questions}) => (
  <div className="card p-2 m-2">
    <h3>
      All Questions
    </h3>
    <div>
      {questions.map(question => (
        <div className="card mt-2 p-2" key={question.id}>

          <div className="col-sm-8 col-md-6">
            <div>{question.question}</div>
            <div>Correct answer: {question.answer}</div>
            <div>
              Distractors:
              <ul>
                {question.distractors.map(distractor => (
                  <li key={distractor}>{distractor}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-sm-4 col-md-6">
            <Link to={`/question/${question.id}`}
              className="btn btn-sm btn-primary">
                Edit
            </Link>
            <Link to={`/delete/${question.id}`}
              className="btn btn-sm btn-danger">
                Delete
            </Link>
          </div>

        </div>
      ))}
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
    return {
        questions: state.questions
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    // const text = ownProps.match.params.text;
    return {
      createNewQuestion() {
        dispatch(requestQuestionCreation());
      }
    }
}

export const ConnectedQuestionList = connect(mapStateToProps, mapDispatchToProps) (QuestionList);