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
      <table className="table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Distractors</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question.id}>
              <td>{question.question}</td>
              <td>{question.answer}</td>
              <td>
                <div>
                  {question.distractors.map(distractor => (
                    <div key={distractor}>
                      {distractor}
                    </div>
                  ))}
                </div>
              </td>
              <td>
                <Link to={`/question/${question.id}`}>
                  <button className="btn btn-sm btn-primary">
                    Edit
                  </button>
                </Link>
                <Link to={`/delete/${question.id}`}>
                  <button className="btn btn-sm btn-danger">
                      Delete
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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