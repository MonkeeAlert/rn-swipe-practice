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
  let index = 0;

  switch (action.type) {
    case TodosActions.ADD_TODO:
      const now = Date.now();

      const todo: ITodo = {
        id: generateID(),
        created_at: now,
        started_at: 0,
        finished_at: 0,
        category: 'default',
        wasCompleted: false,
        title: action.payload.title,
        seconds: 0,
      };

      return {
        list: [...state.list, todo],
      };

    case TodosActions.EDIT_TODO:
      if (state.list.length >= 1) {
        index = state.list.findIndex((i: ITodo) => i.id === action.payload.id);
        state.list[index] = action.payload;
      }

      return {list: state.list};

    case TodosActions.DELETE_TODO: {
      if (state.list.length >= 1) {
        filtered = state.list.filter((i: ITodo) => i.id !== action.payload.id);

        return {
          list: filtered,
        };
      }
    }

    default:
      return state;
  }
};
