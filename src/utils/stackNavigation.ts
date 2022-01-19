import {ITodoColor} from './types';

/**
 * @see https://reactnavigation.org/blog/2021/08/14/react-navigation-6.0/#better-type-safety
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Settings: undefined;
      AddTodo: undefined;
      EditTodo: {
        title: string;
        id: string;
        colorParams: ITodoColor;
        isTimerEnabled?: boolean;
      };
    }
  }
}

export type RootStackParamList = {
  Settings: {};
  AddTodo: {};
  EditTodo: {
    title: string;
    id: string;
    colorParams: ITodoColor;
    isTimerEnabled?: boolean;
  };
};
