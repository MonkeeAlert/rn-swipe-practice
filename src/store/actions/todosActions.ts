import {ITodo} from '../types/todosTypes';
import {TodosActions} from '../types/todosTypes';

export const addTodo = (todo: ITodo) => {
  return {
    type: TodosActions.ADD_TODO,
    payload: todo,
  };
};

export const editTodo = (todo: ITodo) => ({
  type: TodosActions.EDIT_TODO,
  payload: {...todo},
});

export const deleteTodo = (id: string) => ({
  type: TodosActions.DELETE_TODO,
  payload: {id},
});

// export const setActiveCategory = (category: string) => ({
//   type: TodosActions.SET_ACTIVE_CATEGORY,
//   payload: {category},
// });
