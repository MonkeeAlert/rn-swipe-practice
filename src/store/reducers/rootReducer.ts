import {combineReducers} from 'redux';
import {todosReducer} from './todosReducers';

export const rootReducer = combineReducers({
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
