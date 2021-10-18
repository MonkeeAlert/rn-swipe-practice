// import createSagaMiddleware from '@redux-saga/core';
import {createStore} from 'redux';
import {rootReducer} from './reducers/rootReducer';

// const composeEnhancers = compose;

// const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  // composeEnhancers(applyMiddleware(sagaMiddleware)),
);

// sagaMiddleware.run(store);
