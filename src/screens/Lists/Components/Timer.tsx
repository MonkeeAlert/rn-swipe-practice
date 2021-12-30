import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
        started_at: Date.now(),
        finished_at: props.item.finished_at,
        seconds: secondsRef.current,
      };

      dispatch(editTodo(todo));
    }
  });

  useEffect(() => {
    const past =
      props.item.seconds +
      (props.status === 'active' ? getSecondsFrom(props.item.started_at) : 0);

    secondsRef.current = past;
    setTimer(getFormattedTimer(secondsRef.current));

    return () => {
      const now = Date.now();
      const statusOnUnmount = statusRef.current;

      const savedTodo: ITodo = {
        ...props.item,
        status: statusOnUnmount,
        started_at: statusOnUnmount === 'active' ? now : props.item.started_at,
        finished_at: now,
        seconds: secondsRef.current,
      };

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
      started_at: now,
      finished_at: now,
      wasCompleted: false,
      seconds: secondsRef.current,
    };

    switch (status) {
      case 'active':
        modified.finished_at = props.item.finished_at;

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
