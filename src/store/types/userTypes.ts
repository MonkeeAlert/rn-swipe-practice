import {ActionType} from '../../utils/types';

export interface IUser {
  isDarkTheme: boolean;
}

export enum UserActions {
  CHANGE_THEME = 'CHANGE_THEME',
}

export type UserActionsTypes = ActionType<typeof UserActions.CHANGE_THEME, {}>;
