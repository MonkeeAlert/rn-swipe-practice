import {colors} from './constants';
import {getModerateScale} from './Scaling';
import {useRef, useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {useSelector} from 'react-redux';
import {getUserState} from '../store/rootSelectors';
import {IUserTheme} from './types';

export const useTheme = () => {
  const {isDarkTheme} = useSelector(getUserState);

  const lightTheme: IUserTheme = {
    primary: colors.white,
    background: colors.white,
    card: colors.white,
    text: colors.black,
    border: colors.lightGrey,
    notification: colors.white,
  };

  const darkTheme: IUserTheme = {
    primary: colors.black,
    background: colors.black,
    card: colors.black,
    text: colors.white,
    border: colors.darkGrey,
    notification: colors.black,
  };

  const userTheme = isDarkTheme ? darkTheme : lightTheme;

  const fonts = {
    small: getModerateScale(14 - 2),
    regular: getModerateScale(16 - 2),
    medium: getModerateScale(18 - 2),
    large: getModerateScale(20 - 2),
  };

  return {colors, fonts, userTheme};
};

export const useAppStateCallbacks = (
  onActive?: (date: number) => void,
  onBackground?: (date: number) => void,
) => {
  const appStateRef = useRef(AppState.currentState);
  const dateWentToForeground = useRef(0);

  useEffect(() => {
    const subscription: any = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (
          appStateRef.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          if (onBackground) {
            onBackground(dateWentToForeground.current);
          }
        } else {
          if (onActive) {
            onActive(dateWentToForeground.current);
          }
        }

        dateWentToForeground.current = Date.now();
        appStateRef.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [onActive, onBackground]);
};
