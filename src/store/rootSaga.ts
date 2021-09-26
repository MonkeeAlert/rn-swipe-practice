// import createSagaMiddleware from '@redux-saga/core';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {todosReducer} from './reducers/todosReducers';

// const composeEnhancers = compose;

// const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  todos: todosReducer,
});

export const store = createStore(
  rootReducer,
  // composeEnhancers(applyMiddleware(sagaMiddleware)),
);

// sagaMiddleware.run(store);
