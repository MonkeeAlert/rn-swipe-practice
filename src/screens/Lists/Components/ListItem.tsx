import Swipeable from 'react-native-gesture-handler/Swipeable';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import {getDate, getFormattedTimer} from '../../../utils/functions';
import {useTheme} from '../../../utils/hooks';
import {RectButton} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {ITodo, TodosActions} from '../../../store/types/todosTypes';
import {deleteTodo, editTodo} from '../../../store/actions/todosActions';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {getModerateScale} from '../../../utils/Scaling';

export const ListItem = React.forwardRef((props: ITodo, previousRef) => {
  const {colors, fonts} = useTheme();
  const navState = useNavigationState(state => state);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const swipeRef = useRef<Swipeable>(null);
  const timerRef = useRef<any>(null);
  const secondsRef = useRef<number>(0);
  const statusRef = useRef<ITodo['category']>(props.category);

  const [createdAt, setCreatedAt] = useState('');
  const [status, setStatus] = useState<ITodo['category']>(checkStatus());
  const [timer, setTimer] = useState(
    getFormattedTimer(
      checkStatus() === 'active'
        ? 1 + (Date.now() - props.started_at) / 1000 + props.seconds
        : 0,
    ),
  );

  const theme = StyleSheet.create({
    row: {
      backgroundColor: colors.white,
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

  useEffect(() => {
    swipeRef.current?.close();
  }, [navState]);

  function checkStatus() {
    return props.wasCompleted ? 'done' : statusRef.current;
  }

  useEffect(() => {
    // Set date of todo creation
    const d = getDate(props.created_at).toString();
    setCreatedAt(d);

    // Set seconds after todo was started
    const difference =
      props.category === 'active' ? (Date.now() - props.started_at) / 1000 : 0;
    secondsRef.current = difference + props.seconds;
    setTimer(getFormattedTimer(secondsRef.current));

    // If todo was running before unmount, this will trigger seconds incrementation
    if (props.category === 'active') {
      timerRef.current = setInterval(() => {
        secondsRef.current += 1;

        setTimer(getFormattedTimer(secondsRef.current));
      }, 1000);
    }

    return () => {
      const now = Date.now();
      const statusOnUnmount = statusRef.current;

      const savedTodo: ITodo = {
        ...props,
        category: statusOnUnmount,
        started_at: statusOnUnmount === 'active' ? now : props.started_at,
        seconds: secondsRef.current,
      };

      clearInterval(timerRef.current);
      dispatch(editTodo(savedTodo));
    };
  }, []);

  const renderLeftActions = (_, dragX: any) => {
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
          style={[theme.button, theme.buttonDelete]}
          onPress={handleAction}>
          <Animated.View style={{opacity: transition}}>
            <Icon type={'material'} name={'delete'} color={colors.white} />
          </Animated.View>
        </RectButton>
      </View>
    );
  };

  const renderRightActions = (_, dragX: any) => {
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

    const handleCompleteTodo = () => {
      const now = Date.now();
      const s = props.category === 'done' ? 'default' : 'done';

      dispatch(
        editTodo({
          ...props,
          category: s,
          started_at: now,
          finished_at: now,
          wasCompleted: props.category === 'done',
        }),
      );

      setStatus(s);
      swipeRef.current?.close();
    };

    const changeTodoState = () => {
      statusRef.current = status === 'active' ? 'paused' : 'active';

      const now = Date.now();
      const todo: ITodo = {
        ...props,
        category: statusRef.current,
        started_at: now,
        finished_at: statusRef.current === 'paused' ? now : props.finished_at,
      };

      if (statusRef.current === 'active') {
        timerRef.current = setInterval(() => {
          secondsRef.current += 1;

          setTimer(getFormattedTimer(secondsRef.current));
        }, 1000);
      } else {
        clearInterval(timerRef.current);
      }

      dispatch(editTodo(todo));
      setStatus(statusRef.current);
      swipeRef.current?.close();
    };

    return (
      <View style={styles.inline}>
        {props.category !== 'done' ? (
          <>
            <RectButton style={theme.button} onPress={handleCompleteTodo}>
              <Animated.View
                style={[theme.rightButtonsBorder, {opacity: third}]}>
                <Icon type={'material'} name={'done'} color={colors.darkGrey} />
              </Animated.View>
            </RectButton>
            <RectButton style={theme.button} onPress={handleEditTodo}>
              <Animated.View
                style={[theme.rightButtonsBorder, {opacity: second}]}>
                <Icon type={'material'} name={'edit'} color={colors.darkGrey} />
              </Animated.View>
            </RectButton>
            <RectButton style={theme.button} onPress={changeTodoState}>
              <Animated.View
                style={[theme.rightButtonsBorder, {opacity: first}]}>
                <Icon
                  type={'material'}
                  name={status === 'active' ? 'pause' : 'play-arrow'}
                  color={colors.darkGrey}
                />
              </Animated.View>
            </RectButton>
          </>
        ) : (
          <RectButton style={theme.button} onPress={handleCompleteTodo}>
            <Animated.View style={[theme.rightButtonsBorder, {opacity: first}]}>
              <Icon type={'material'} name={'clear'} color={colors.darkGrey} />
            </Animated.View>
          </RectButton>
        )}
      </View>
    );
  };

  // Compare to refs
  const handleSwipeableWillOpen = () => {
    if (previousRef && previousRef.current !== null) {
      if (previousRef.current !== swipeRef.current) {
        previousRef.current?.close();
      }
    }
  };

  const handleSwipeableOpen = () => {
    previousRef.current = swipeRef.current;
  };

  return (
    <Swipeable
      ref={swipeRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableOpen={handleSwipeableOpen}
      onSwipeableWillOpen={handleSwipeableWillOpen}>
      <View style={[styles.row, theme.row]}>
        <View>
          <Text style={theme.title}>{props.title}</Text>
          <Text style={theme.date}>{createdAt}</Text>
        </View>
        <View>
          <Text style={theme.date}>{timer}</Text>
        </View>
      </View>
    </Swipeable>
  );
});

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: getModerateScale(10),
    paddingHorizontal: getModerateScale(12),
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  inline: {
    flexDirection: 'row',
  },
});
