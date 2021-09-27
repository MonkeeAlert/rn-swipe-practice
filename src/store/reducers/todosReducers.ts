import {generateID} from '../../utils/functions';
import {ITodo, TodosActions, TodosActionsTypes} from '../types/todosTypes';

const initialState = {
  list: [],
};

export const todosReducer = (
  state = initialState,
  action: TodosActionsTypes,
) => {
  let filtered: ITodo[] = [];
  let needle = {} as ITodo;

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
      if (state.list.length >= 1) {
        filtered = state.list.filter((i: ITodo) => i.id !== action.payload.id);
        needle = state.list.find((i: ITodo) => i.id === action.payload.id);
        needle.category = 'deleted';
      }

      return {
        list: [...filtered, needle],
      };

    case TodosActions.RESTORE_TODO:
      if (state.list.length >= 1) {
        filtered = state.list.filter((i: ITodo) => i.id !== action.payload.id);
        needle = state.list.find((i: ITodo) => i.id === action.payload.id);
        needle.category = 'default';
      }

      return {
        list: [...filtered, needle],
      };

    default:
      return state;
  }
};
