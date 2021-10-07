import {Swipeable} from 'react-native-gesture-handler';
import {ActionType} from '../../utils/types';

export interface ITodo {
  id: string;
  created_at: number;
  started_at: number;
  finished_at: number;
  category: 'default' | 'active' | 'paused' | 'deleted' | 'done';
  title: string;
  wasCompleted: boolean;
}

export enum TodosActions {
  ADD_TODO = 'ADD_TODO',
  EDIT_TODO = 'EDIT_TODO',
  MOVE_TODO = 'MOVE_TODO',
}

export type TodosActionsTypes =
  | ActionType<typeof TodosActions.ADD_TODO, ITodo>
  | ActionType<typeof TodosActions.EDIT_TODO, ITodo>
  | ActionType<
      typeof TodosActions.MOVE_TODO,
      {id: string; category: ITodo['category']}
    >;
