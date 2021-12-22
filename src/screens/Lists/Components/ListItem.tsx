import Swipeable from 'react-native-gesture-handler/Swipeable';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import {
  getDate,
  getFormattedTimer,
  getSecondsFrom,
} from '../../../utils/functions';
import {useAppStateCallbacks, useTheme} from '../../../utils/hooks';
import {RectButton} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {ITodo, TodosActions} from '../../../store/types/todosTypes';
import {deleteTodo, editTodo} from '../../../store/actions/todosActions';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {getModerateScale} from '../../../utils/Scaling';

interface ITodoProps extends ITodo {
  selectedCategory: ITodo['status'];
}

const areItemsEqual = (prev: ITodoProps, next: ITodoProps) => {
  return (
    prev.started_at === next.started_at && prev.finished_at === next.finished_at
  );
};

export const ListItem = React.memo(
  React.forwardRef((props: ITodoProps, previousRef: any) => {
    const {colors} = useTheme();
    const {styles} = useStyles();
    const navState = useNavigationState(state => state);
    const dispatch = useDispatch();
    const {navigate} = useNavigation();

    const swipeRef = useRef<Swipeable>(null);
    const timerRef = useRef<any>(null);
    const secondsRef = useRef<number>(props.seconds);
    const statusRef = useRef<ITodo['status']>(props.status);

    const [createdAt, setCreatedAt] = useState('');
    const [status, setStatus] = useState<ITodo['status']>(checkStatus());
    const [timer, setTimer] = useState(getFormattedTimer(props.seconds));

    function checkStatus() {
      return props.wasCompleted ? 'done' : statusRef.current;
    }

    const setDifference = () => {
      const past =
        props.seconds +
        (props.status === 'active' ? getSecondsFrom(props.started_at) : 0);

      secondsRef.current = past;
      setTimer(getFormattedTimer(secondsRef.current));

      // If todo was running before unmount, this will start to increment seconds
      if (props.status === 'active') {
        clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
          secondsRef.current += 1;

          setTimer(getFormattedTimer(secondsRef.current));
        }, 1000);
      }
    };

    const renderLeftActions = (_: any, dragX: any) => {
      const interpolations = [0, getModerateScale(60), getModerateScale(61)];

      const transition = dragX.interpolate({
        inputRange: interpolations,
        outputRange: [0, 1, 1],
      });

      const handleAction = () => {
        clearInterval(timerRef.current);
        dispatch(deleteTodo(props.id));
      };

      return (
        <View style={styles.inline}>
          <RectButton
            style={[styles.button, styles.buttonDelete]}
            onPress={handleAction}>
            <Animated.View style={{opacity: transition}}>
              <Icon type={'material'} name={'delete'} color={colors.white} />
            </Animated.View>
          </RectButton>
        </View>
      );
    };

    const renderRightActions = (_: any, dragX: any) => {
      const firstInputInterpolations = [
        getModerateScale(-61),
        getModerateScale(-60),
        getModerateScale(-30),
      ];

      const secondInputInterpolations = [
        getModerateScale(-131),
        getModerateScale(-130),
        getModerateScale(-100),
      ];

      const thirdInputInterpolations = [
        getModerateScale(-181),
        getModerateScale(-180),
        getModerateScale(-150),
      ];

      const first = dragX.interpolate({
        inputRange: firstInputInterpolations,
        outputRange: [1, 1, 0],
      });

      const second = dragX.interpolate({
        inputRange: secondInputInterpolations,
        outputRange: [1, 1, 0],
      });

      const third = dragX.interpolate({
        inputRange: thirdInputInterpolations,
        outputRange: [1, 1, 0],
      });

      // Edit todo in modal screen
      const handleEditTodo = () => {
        navigate('Modal_Data', {
          title: `Edit todo: ${
            props.title.length > 18
              ? `${props.title.slice(0, 15)}...`
              : props.title
          }`,
          buttonConfig: {
            title: 'Edit',
            action: TodosActions.EDIT_TODO,
            todoId: props.id,
          },
        });
      };

      // Complete todo
      const handleCompleteTodo = () => {
        statusRef.current = props.status === 'done' ? 'default' : 'done';

        const now = Date.now();
        const todo = {
          ...props,
          category: statusRef.current,
          started_at: now,
          finished_at: now,
          wasCompleted: props.status === 'done',
        };

        clearInterval(timerRef.current);
        setStatus(statusRef.current);
        dispatch(editTodo(todo));
        swipeRef.current?.close();
      };

      // Change state to active or paused
      const changeTodoState = () => {
        statusRef.current = status === 'active' ? 'paused' : 'active';

        const now = Date.now();

        const todo: ITodo = {
          ...props,
          status: statusRef.current,
          started_at: now,
          finished_at: statusRef.current === 'paused' ? now : props.finished_at,
          seconds: secondsRef.current,
        };

        if (statusRef.current === 'active') {
          timerRef.current = setInterval(() => {
            secondsRef.current += 1;

            setTimer(getFormattedTimer(secondsRef.current));
          }, 1000);
        } else {
          clearInterval(timerRef.current);
        }

        setStatus(statusRef.current);
        dispatch(editTodo(todo));
        swipeRef.current?.close();
      };

      return (
        <View style={styles.inline}>
          {props.status !== 'done' ? (
            <>
              <RectButton style={styles.button} onPress={handleCompleteTodo}>
                <Animated.View
                  style={[styles.rightButtonsBorder, {opacity: third}]}>
                  <Icon
                    type={'material'}
                    name={'done'}
                    color={colors.darkGrey}
                  />
                </Animated.View>
              </RectButton>
              <RectButton style={styles.button} onPress={handleEditTodo}>
                <Animated.View
                  style={[styles.rightButtonsBorder, {opacity: second}]}>
                  <Icon
                    type={'material'}
                    name={'edit'}
                    color={colors.darkGrey}
                  />
                </Animated.View>
              </RectButton>
              <RectButton style={styles.button} onPress={changeTodoState}>
                <Animated.View
                  style={[styles.rightButtonsBorder, {opacity: first}]}>
                  <Icon
                    type={'material'}
                    name={status === 'active' ? 'pause' : 'play-arrow'}
                    color={colors.darkGrey}
                  />
                </Animated.View>
              </RectButton>
            </>
          ) : (
            <RectButton style={styles.button} onPress={handleCompleteTodo}>
              <Animated.View
                style={[styles.rightButtonsBorder, {opacity: first}]}>
                <Icon
                  type={'material'}
                  name={'clear'}
                  color={colors.darkGrey}
                />
              </Animated.View>
            </RectButton>
          )}
        </View>
      );
    };

    // Compare to refs
    const handleSwipeableWillOpen = () => {
      if (
        previousRef?.current !== null &&
        previousRef?.current !== swipeRef.current
      ) {
        previousRef?.current?.close();
      }
    };

    const handleSwipeableOpen = () => {
      previousRef.current = swipeRef.current;
    };

    // Change seconds
    useAppStateCallbacks(undefined, date => {
      const past = getSecondsFrom(date);

      if (statusRef.current === 'active') {
        const todo: ITodo = {
          ...props,
          status: 'active',
          started_at: Date.now(),
          finished_at: props.finished_at,
          seconds: secondsRef.current + past,
        };

        dispatch(editTodo(todo));
      }
    });

    useEffect(() => {
      swipeRef.current?.close();
    }, [navState]);

    useEffect(() => {
      // Set date of todo creation
      const d = getDate(props.created_at).toString();
      setCreatedAt(d);

      // Triggers when user leaves screen
      return () => {
        const now = Date.now();
        const statusOnUnmount = statusRef.current;

        const savedTodo: ITodo = {
          ...props,
          status: statusOnUnmount,
          started_at: statusOnUnmount === 'active' ? now : props.started_at,
          seconds: secondsRef.current,
        };

        clearInterval(timerRef.current);
        dispatch(editTodo(savedTodo));
      };
    }, []);

    useEffect(() => {
      setDifference();

      return () => {
        clearInterval(timerRef.current);
      };
    }, [props.seconds]);

    return (
      <Swipeable
        ref={swipeRef}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableOpen={handleSwipeableOpen}
        onSwipeableWillOpen={handleSwipeableWillOpen}
        containerStyle={styles.wrapper}>
        <View style={[styles.row, styles.wrapper]}>
          <View>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.date}>{createdAt}</Text>
          </View>
          <View>
            <Text style={styles.date}>{timer}</Text>
          </View>
        </View>
      </Swipeable>
    );
  }),
  areItemsEqual,
);

const useStyles = () => {
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    row: {
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: getModerateScale(10),
      paddingHorizontal: getModerateScale(12),
      width: Dimensions.get('window').width,
      flexDirection: 'row',
    },
    wrapper: {
      backgroundColor: colors.white,
    },
    inline: {
      flexDirection: 'row',
    },
    title: {
      fontSize: fonts.medium,
      color: colors.black,
      fontWeight: 'bold',
      paddingTop: 4,
      marginBottom: 4,
    },
    date: {
      fontWeight: '100',
      fontSize: fonts.small,
      color: colors.infoLight,
    },
    button: {
      backgroundColor: colors.white,
      width: getModerateScale(60),
      justifyContent: 'center',
    },
    buttonText: {
      color: colors.darkGrey,
    },
    buttonDelete: {
      backgroundColor: colors.error,
    },
    rightButtonsBorder: {
      borderColor: colors.grey,
      borderLeftWidth: 1,
    },
  });

  return {styles};
};
