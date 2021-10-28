import React, {useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MainStackScreen from './src/navigation/MainStackNavigator';
import {updateTodoList} from './src/store/actions/todosActions';
import {getTodosState} from './src/store/rootSelectors';
import {ITodo} from './src/store/types/todosTypes';

const AppContainer = () => {
  const dispatch = useDispatch();
  const {list} = useSelector(getTodosState);

  const appStateRef = useRef(AppState.currentState);
  const dateWentToForeground = useRef(0);

  useEffect(() => {
    const subscription: any = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        // App is active
        if (
          appStateRef.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          const now = Date.now();
          const seconds = (now - dateWentToForeground.current) / 1000;

          const updated = list.map(i => {
            if (i.category !== 'active') {
              return i;
            } else {
              return {
                ...i,
                seconds: i.seconds + seconds,
              };
            }
          });

          dispatch(updateTodoList(updated));
        }

        dateWentToForeground.current = Date.now();
        appStateRef.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [list]);

  return <MainStackScreen />;
};

export default AppContainer;
