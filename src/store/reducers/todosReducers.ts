import {generateID} from '../../utils/functions';
import {ITodo, TodosActions, TodosActionsTypes} from '../types/todosTypes';

const initialState = {
  list: [] as ITodo[],
};

export const todosReducer = (
  state = initialState,
  action: TodosActionsTypes,
) => {
  let list: ITodo[] = [];
  let index = 0;

  switch (action.type) {
    case TodosActions.ADD_TODO:
      const now = Date.now();

      const willStartOnCreate = action.payload.status === 'active';

      const todo: ITodo = {
        id: generateID(),
        createdAt: now,
        startedAt: willStartOnCreate ? now : 0,
        pausedAt: willStartOnCreate ? now : 0,
        status: action.payload.status ?? 'default',
        wasCompleted: false,
        title: action.payload.title,
        seconds: 0,
        colorParams: action.payload.colorParams,
        isTimerEnabled: action.payload.isTimerEnabled ?? false,
      };

      return {
        list: [todo, ...state.list],
      };

    case TodosActions.EDIT_TODO:
      list = JSON.parse(JSON.stringify(state.list));

      if (state.list.length >= 1) {
        index = state.list.findIndex((i: ITodo) => i.id === action.payload.id);
        list[index] = {...list[index], ...action.payload};
      }

      return {list};

    case TodosActions.DELETE_TODO:
      list = JSON.parse(JSON.stringify(state.list));

      if (state.list.length >= 1) {
        index = state.list.findIndex((i: ITodo) => i.id === action.payload.id);
        list.splice(index, 1);
      }

      return {list};

    default:
      return state;
  }
};
