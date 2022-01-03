import {ITodoColor} from './types';

export type RootStackParamList = {
  AddTodo: {};
  EditTodo: {
    title: string;
    id: string;
    colorParams: ITodoColor;
    isTimerEnabled?: boolean;
  };
};
