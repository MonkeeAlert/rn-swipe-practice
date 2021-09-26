import {generateID} from '../../utils/functions';
import {ITodo, TodosActions, TodosActionsTypes} from '../types/todosTypes';

const initialState = {
  list: [],
};

export const todosReducer = (
  state = initialState,
  action: TodosActionsTypes,
) => {
  switch (action.type) {
    case TodosActions.ADD_TODO:
      const now = Date.now();

      const todo: ITodo = {
        id: generateID(),
        created_at: now,
        started_at: 0,
        finished_at: 0,
        category: 'default',
        completed: false,
        title: action.payload.title,
      };

      return {
        list: [...state.list, todo],
      };

    case TodosActions.DELETE_TODO:
      const filtered =
        state.list.length > 1
          ? state.list.filter((i: ITodo) => i.id !== action.payload.id)
          : [];

      return {
        list: filtered,
      };
    default:
      return state;
  }
};
