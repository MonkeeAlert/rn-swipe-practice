import {ActionType, ITodoColor} from '../../utils/types';

export interface ITodo {
  id: string;
  createdAt: number;
  startedAt: number;
  pausedAt: number;
  status: 'default' | 'active' | 'paused' | 'done';
  title: string;
  wasCompleted: boolean;
  seconds: number;
  colorParams: ITodoColor;
  isTimerEnabled?: boolean;
}

export enum TodosActions {
  ADD_TODO = 'ADD_TODO',
  EDIT_TODO = 'EDIT_TODO',
  DELETE_TODO = 'DELETE_TODO',
}

export type TodosActionsTypes =
  | ActionType<typeof TodosActions.ADD_TODO, ITodo>
  | ActionType<typeof TodosActions.EDIT_TODO, ITodo>
  | ActionType<typeof TodosActions.DELETE_TODO, {id: string}>;
