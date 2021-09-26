import {ITodo} from '../types/todosTypes';

export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const addTodo = (todo: ITodo) => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};

export const editTodo = (todo: ITodo) => ({
  type: EDIT_TODO,
  payload: {todo},
});

export const deleteTodo = (id: string) => ({
  type: DELETE_TODO,
  payload: {id},
});
