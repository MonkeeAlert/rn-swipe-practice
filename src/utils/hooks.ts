import {colors} from './constants';
import {getModerateScale} from './Scaling';
import {useRef, useEffect} from 'react';
import {AppState, AppStateStatic, AppStateStatus} from 'react-native';

export const useTheme = () => {
  const fonts = {
    small: getModerateScale(14 - 2),
    regular: getModerateScale(16 - 2),
    medium: getModerateScale(18 - 2),
    large: getModerateScale(20 - 2),
  };

  return {colors, fonts};
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
  }, []);
};
