import {UserActions, UserActionsTypes} from '../types/userTypes';

const initialState = {
  isDarkTheme: false,
};

export const userReducer = (state = initialState, action: UserActionsTypes) => {
  switch (action.type) {
    case UserActions.CHANGE_THEME: {
      return {isDarkTheme: !state.isDarkTheme};
    }

    default:
      return state;
  }
};
