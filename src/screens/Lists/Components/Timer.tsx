import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {editTodo} from '../../../store/actions/todosActions';
import {ITodo} from '../../../store/types/todosTypes';
import {getFormattedTimer, getSecondsFrom} from '../../../utils/functions';
import {useAppStateCallbacks, useTheme} from '../../../utils/hooks';

interface IProps {
  item: ITodo;
  status: ITodo['status'];
  // seconds: number;
  // item.started_at: ITodo['started_at'];
  // item.finished_at: ITodo['finished_at'];
}

export const Timer = (props: IProps) => {
  const {styles} = useStyles();
  const dispatch = useDispatch();

  const [timer, setTimer] = useState(getFormattedTimer(props.item.seconds));
  const [status, setStatus] = useState(props.status);

  const timerRef = useRef<any>(null);
  const secondsRef = useRef<number>(props.item.seconds);
  const statusRef = useRef<ITodo['status']>(props.item.status);

  // const setDifference = useCallback(() => {
  //   clearInterval(timerRef.current);
  //   const past =
  //     props.item.seconds +
  //     (props.status === 'active' ? getSecondsFrom(props.item.started_at) : 0);

  //   console.log('@past', past, props.item.seconds, props.status, props);

  //   secondsRef.current = past;
  //   setTimer(getFormattedTimer(secondsRef.current));

  //   // If todo was running before unmount, this will start to increment seconds
  //   if (props.status === 'active') {
  //     timerRef.current = setInterval(() => {
  //       secondsRef.current += 1;

  //       setTimer(getFormattedTimer(secondsRef.current));
  //     }, 1000);
  //   }
  // }, [props]);

  useAppStateCallbacks(undefined, date => {
    const past = getSecondsFrom(date);

    if (statusRef.current === 'active') {
      const todo: ITodo = {
        ...props.item,
        status: 'active',
        started_at: Date.now(),
        finished_at: props.item.finished_at,
        seconds: secondsRef.current + past,
      };

      console.log('@', secondsRef.current, todo.seconds);

      dispatch(editTodo(todo));
      setTimer(getFormattedTimer(todo.seconds));
    }
  });

  useEffect(() => {
    return () => {
      const now = Date.now();
      const statusOnUnmount = status;

      const savedTodo: ITodo = {
        ...props.item,
        status: statusOnUnmount,
        started_at: statusOnUnmount === 'active' ? now : props.item.started_at,
        seconds: secondsRef.current,
      };

      clearInterval(timerRef.current);
      dispatch(editTodo(savedTodo));
    };
  }, []);

  // useEffect(() => {
  //   setDifference();

  //   return () => {
  //     clearInterval(timerRef.current);
  //   };
  // }, [setDifference]);

  useEffect(() => setStatus(props.status), [props.status]);

  useEffect(() => {
    const now = Date.now();

    statusRef.current = status;

    switch (status) {
      case 'active':
        const _active: ITodo = {
          ...props.item,
          status: status,
          started_at: now,
          finished_at: props.item.finished_at,
          seconds: secondsRef.current,
        };

        timerRef.current = setInterval(() => {
          secondsRef.current += 1;

          setTimer(getFormattedTimer(secondsRef.current));
        }, 1000);

        dispatch(editTodo(_active));
        break;

      case 'paused':
        const _paused: ITodo = {
          ...props.item,
          status: status,
          started_at: now,
          finished_at: now,
          seconds: secondsRef.current,
        };

        clearInterval(timerRef.current);
        dispatch(editTodo(_paused));
        break;

      case 'done':
        const _done = {
          ...props.item,
          status: status,
          started_at: now,
          finished_at: now,
          wasCompleted: true,
        };

        clearInterval(timerRef.current);
        dispatch(editTodo(_done));
        break;

      default:
        const _default = {
          ...props.item,
          status: status,
          started_at: now,
          finished_at: now,
          wasCompleted: false,
        };

        clearInterval(timerRef.current);
        dispatch(editTodo(_default));
        break;
    }
  }, [status]);

  useEffect(() => {
    console.log('@timer', timer);
  }, [timer]);

  return (
    <View>
      <Text style={styles.date}>{timer}</Text>
    </View>
  );
};

const useStyles = () => {
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    date: {
      fontWeight: '100',
      fontSize: fonts.small,
      color: colors.infoLight,
    },
  });

  return {styles};
};
