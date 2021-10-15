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

interface ITodoStatus {
  status: 'Not started' | 'In progress' | 'Completed';
}

export const ListItem = React.forwardRef((props: ITodo, previousRef) => {
  const {colors} = useTheme();
  const navState = useNavigationState(state => state);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const [createdAt, setCreatedAt] = useState('');
  const [timer, setTimer] = useState('00:00:00');
  const [status, setStatus] = useState<ITodoStatus['status']>('Not started');

  const swipeRef = useRef<Swipeable>(null);
  const timerRef = useRef<any>(null);
  const secondsRef = useRef<number>(0);

  const theme = StyleSheet.create({
    row: {
      backgroundColor: colors.white,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      paddingTop: 4,
    },
    date: {
      fontWeight: '100',
    },
    button: {
      backgroundColor: colors.white,
      width: 60,
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

  useEffect(() => {
    if (props.created_at) {
      const d = getDate(props.created_at).toString();
      const s: ITodoStatus['status'] =
        props.started_at !== props.finished_at
          ? !props.wasCompleted
            ? 'In progress'
            : 'Completed'
          : 'Not started';

      setCreatedAt(d);
      setStatus(s);
    }
  }, [
    props.started_at,
    props.finished_at,
    props.created_at,
    props.wasCompleted,
  ]);
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
      const timestamp = Date.now();
      dispatch(
        editTodo({
          ...props,
          category: props.category === 'done' ? 'default' : 'done',
          started_at: timestamp,
          finished_at: timestamp,
          wasCompleted: props.category === 'done',
        }),
      );

      swipeRef.current?.close();
    };

    const changeTodoState = () => {
      const now = Date.now();

      if (status === 'Not started') {
        dispatch(
          editTodo({
            ...props,
            category: 'active',
            started_at: now,
          }),
        );

        timerRef.current = setInterval(() => {
          secondsRef.current += 1;

          setTimer(getFormattedTimer(secondsRef.current));
        }, 1000);
      } else {
        dispatch(
          editTodo({
            ...props,
            category: 'default',
            started_at: now,
            finished_at: now,
          }),
        );

        clearInterval(timerRef.current);
      }

      swipeRef.current?.close();
    };

    return (
      <View style={styles.inline}>
        <RectButton style={theme.button} onPress={handleCompleteTodo}>
          <Animated.View style={[theme.rightButtonsBorder, {opacity: third}]}>
            <Icon
              type={'material'}
              name={props.category === 'done' ? 'clear' : 'done'}
              color={colors.darkGrey}
            />
          </Animated.View>
        </RectButton>
        <RectButton style={theme.button} onPress={handleEditTodo}>
          <Animated.View style={[theme.rightButtonsBorder, {opacity: second}]}>
            <Icon type={'material'} name={'edit'} color={colors.darkGrey} />
          </Animated.View>
        </RectButton>
        <RectButton style={theme.button} onPress={changeTodoState}>
          <Animated.View style={[theme.rightButtonsBorder, {opacity: first}]}>
            <Icon
              type={'material'}
              name={status === 'In progress' ? 'pause' : 'play-arrow'}
              color={colors.darkGrey}
            />
          </Animated.View>
        </RectButton>
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
