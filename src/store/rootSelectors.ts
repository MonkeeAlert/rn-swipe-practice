import {RootState} from './reducers/rootReducer';

export const getTodosState = (state: RootState) => state.todos;
export const getUserState = (state: RootState) => state.user;
