import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { defaultState } from '../../server/defaultState';

export const store = createStore(
    function reducer(state = defaultState, action) {
    return state;
    },
    applyMiddleware(createLogger())
);
