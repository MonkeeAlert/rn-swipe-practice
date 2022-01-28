import {UserActions, UserActionsTypes} from '../types/userTypes';

const initialState = {
  theme: 'light',
};

export const userReducer = (state = initialState, action: UserActionsTypes) => {
  switch (action.type) {
    case UserActions.CHANGE_THEME: {
      return {theme: state.theme === 'light' ? 'dark' : 'light'};
    }

    default:
      return state;
  }
};
