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
  let index = 0;
  let isDoneOrDeleted = false;

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

    case TodosActions.EDIT_TODO:
      if (state.list.length >= 1) {
        index = state.list.findIndex((i: ITodo) => i.id === action.payload.id);
        state.list[index].title = action.payload.title;
      }

      return {list: state.list};

    case TodosActions.MOVE_TODO: {
      if (state.list.length >= 1) {
        filtered = state.list.filter((i: ITodo) => i.id !== action.payload.id);
        needle = state.list.find((i: ITodo) => i.id === action.payload.id);

        isDoneOrDeleted =
          action.payload.category === 'done' ||
          action.payload.category === 'deleted';

        needle.category = action.payload.category;
        needle.completed = isDoneOrDeleted;

        if (isDoneOrDeleted) {
          needle.finished_at = Date.now();
        }
      }

      return {
        list: [...filtered, needle],
      };
    }

    default:
      return state;
  }
};
