// Authentication and State
export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER';
export const PROCESSING_AUTHENTICATED_USER = 'PROCESSING_AUTHENTICATED_USER';
export const AUTHENTICATING = 'AUTHENTICATING';
export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED= 'NOT_AUTHENTICATED';
export const SET_STATE = 'SET_STATE';
// Question management
export const REQUEST_QUESTION_CREATION = 'REQUEST_QUESTION_CREATION';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const SET_QUESTION_NAME = 'SET_QUESTION_NAME';
export const SET_QUESTION_ANSWER = 'SET_QUESTION_ANSWER';
export const SET_QUESTION_DISTRACTORS = 'SET_QUESTION_DISTRACTORS';


export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password
})

export const processAuthenticateUser = (status = AUTHENTICATING, session = null) => ({
  type: PROCESSING_AUTHENTICATED_USER,
  session,
  authenticated: status
});

export const setState = (state = {}) => ({
  type: SET_STATE,
  state
}) 

export const requestQuestionCreation = (text) => ({
  type: REQUEST_QUESTION_CREATION,
  text
});

export const createQuestion = (questionID) => ({
  type: CREATE_QUESTION,
  questionID
});

export const setQuestionName = (id, question) => ({
  type: SET_QUESTION_NAME,
  questionID: id,
  question
});

export const setQuestionAnswer = (id, answer) => ({
  type: SET_QUESTION_ANSWER,
  questionID: id,
  answer
});

export const setQuestionDistractor = (id, distractor, index) => ({
  type: SET_QUESTION_DISTRACTORS,
  questionID: id,
  distractor,
  index
});
