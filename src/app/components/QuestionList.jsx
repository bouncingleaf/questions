import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { requestQuestionCreation } from '../store/mutations';

export const QuestionList = ({questions}) => (
    <div className="card p-2 m-2">
      <h3>
        Questions
        <button id="newQuestion" className="btn btn-primary btn-block mt-2">
          Add New
        </button>
      </h3>
      <div>
          {questions.map(question => (
              <div className="card mt-2 p-2" key={question.id}>
                <div>
                  <Link to={`/question/${question.id}`}>
                    {question.question}
                  </Link>
                </div>
                <div>
                  Correct answer: {question.answer}
                </div>
                <div>
                  Distractors:
                  <ul>
                    {question.distractors.map(distractor => (
                      <li key={distractor}>{distractor}</li>
                    ))}
                  </ul>
                </div>
              </div>
          ))}
      </div>
      <button className="btn btn-primary btn-block mt-2">
        Add New
      </button>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    return {
        questions: state.questions
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      createNewQuestion(id) {
        dispatch(requestQuestionCreation(id));
      }
    }
}

export const ConnectedQuestionList = connect(mapStateToProps, mapDispatchToProps) (QuestionList);