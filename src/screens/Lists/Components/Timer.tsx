import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {editTodo} from '../../../store/actions/todosActions';
import {ITodo} from '../../../store/types/todosTypes';
import {getFormattedTimer, getSecondsFrom} from '../../../utils/functions';
import {useAppStateCallbacks, useTheme} from '../../../utils/hooks';

interface IProps {
  item: ITodo;
  status: ITodo['status'];
}

export const Timer = (props: IProps) => {
  const {styles} = useStyles();
  const dispatch = useDispatch();

  const [timer, setTimer] = useState(getFormattedTimer(props.item.seconds));
  const [status, setStatus] = useState(props.status);

  const timerRef = useRef<any>(null);
  const secondsRef = useRef<number>(props.item.seconds);
  const statusRef = useRef<ITodo['status']>(props.item.status);

  useAppStateCallbacks(undefined, date => {
    const past = getSecondsFrom(date);

    if (statusRef.current === 'active') {
      secondsRef.current += past;

      const todo: ITodo = {
        ...props.item,
        status: 'active',
        startedAt: Date.now(),
        pausedAt: props.item.pausedAt,
        seconds: secondsRef.current,
      };

      dispatch(editTodo(todo));
    }
  });

  useEffect(() => {
    const past =
      props.item.seconds +
      (props.status === 'active' ? getSecondsFrom(props.item.startedAt) : 0);

    secondsRef.current = past;
    setTimer(getFormattedTimer(secondsRef.current));

    return () => {
      const now = Date.now();
      const statusOnUnmount = statusRef.current;

      const savedTodo = {
        status: statusOnUnmount,
        startedAt: statusOnUnmount === 'active' ? now : props.item.startedAt,
        pausedAt: now,
        seconds: secondsRef.current,
      } as ITodo;

      clearInterval(timerRef.current);
      dispatch(editTodo(savedTodo));
    };
  }, []);

  useEffect(() => setStatus(props.status), [props.status]);

  useEffect(() => {
    const now = Date.now();
    statusRef.current = status;

    const modified: ITodo = {
      ...props.item,
      status,
      startedAt: now,
      pausedAt: now,
      wasCompleted: false,
      seconds: secondsRef.current,
    };

    switch (status) {
      case 'active':
        modified.pausedAt = props.item.pausedAt;

        timerRef.current = setInterval(() => {
          secondsRef.current += 1;

          setTimer(getFormattedTimer(secondsRef.current));
        }, 1000);

        break;

      case 'done':
        modified.wasCompleted = true;

        clearInterval(timerRef.current);
        break;

      default:
        clearInterval(timerRef.current);
        break;
    }

    dispatch(editTodo(modified));
  }, [status]);

  return props.item.isTimerEnabled ? (
    <Text style={styles.date}>{timer}</Text>
  ) : null;
};

const useStyles = () => {
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    date: {
      fontWeight: '500',
      fontSize: fonts.small,
      color: colors.darkGrey,
    },
  });

  return {styles};
};
