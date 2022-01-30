import {UserActions} from '../types/userTypes';

export const changeTheme = () => {
  return {
    type: UserActions.CHANGE_THEME,
    payload: {},
  };
};
