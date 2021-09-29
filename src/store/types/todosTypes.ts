import {ActionType} from '../../utils/types';

export interface ITodo {
  id: string;
  created_at: number;
  started_at: number;
  finished_at: number;
  category: 'default' | 'active' | 'paused' | 'deleted' | 'done';
  title: string;
  completed: boolean;
}

export enum TodosActions {
  ADD_TODO = 'ADD_TODO',
  EDIT_TODO = 'EDIT_TODO',
  // DELETE_TODO = 'DELETE_TODO',
  // RESTORE_TODO = 'RESTORE_TODO',
  // COMPLETE_TODO = 'COMPLETE_TODO',
  MOVE_TODO = 'MOVE_TODO',
}

export type TodosActionsTypes =
  | ActionType<typeof TodosActions.ADD_TODO, ITodo>
  | ActionType<typeof TodosActions.EDIT_TODO, ITodo>
  // | ActionType<typeof TodosActions.DELETE_TODO, {id: string}>
  // | ActionType<typeof TodosActions.RESTORE_TODO, {id: string}>
  // | ActionType<typeof TodosActions.COMPLETE_TODO, {id: string}>
  | ActionType<
      typeof TodosActions.MOVE_TODO,
      {id: string; category: ITodo['category']}
    >;
