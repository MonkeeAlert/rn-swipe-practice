import Swipeable from 'react-native-gesture-handler/Swipeable';
import React, {useRef, useState, memo, forwardRef, useEffect} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import {getDate} from '../../../utils/functions';
import {useTheme} from '../../../utils/hooks';
import {RectButton} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {ITodo} from '../../../store/types/todosTypes';
import {deleteTodo, editTodo} from '../../../store/actions/todosActions';
import {useNavigation} from '@react-navigation/native';
import {getModerateScale} from '../../../utils/Scaling';
import {RootStackParamList} from '../../../utils/stackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {Timer} from './Timer';
import Circle from '../../../components/Circle';

interface ITodoProps extends ITodo {
  selectedCategory: ITodo['status'];
}

const CIRCLE_SIZE = 16;

const areItemsEqual = (prev: ITodoProps, next: ITodoProps) => {
  return (
    prev.startedAt === next.startedAt &&
    prev.pausedAt === next.pausedAt &&
    prev.title === next.title
  );
};

export const ListItem = memo(
  forwardRef((props: ITodoProps, previousRef: any) => {
    const {colors} = useTheme();
    const {styles} = useStyles();
    const dispatch = useDispatch();
    const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

    const swipeRef = useRef<Swipeable>(null);
    const dateRef = useRef(getDate(props.createdAt).date).current;

    const [status, setStatus] = useState<ITodo['status']>(
      props.wasCompleted ? 'done' : props.status,
    );

    const renderLeftActions = (_: any, dragX: any) => {
      const interpolations = [0, getModerateScale(60), getModerateScale(61)];

      const transition = dragX.interpolate({
        inputRange: interpolations,
        outputRange: [0, 1, 1],
      });

      const handleAction = () => dispatch(deleteTodo(props.id));

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
        navigate('EditTodo', {
          id: props.id,
          title: props.title,
        });
      };

      // Complete todo
      const handleCompleteTodo = () => {
        setStatus(prev => (prev === 'done' ? 'default' : 'done'));
        swipeRef.current?.close();
      };

      // Change state to active or paused
      const changeTodoState = () => {
        setStatus(prev => (prev === 'active' ? 'paused' : 'active'));
        swipeRef.current?.close();
      };

      return (
        <View style={styles.inline}>
          {status !== 'done' ? (
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
            <RectButton
              style={[styles.button, {backgroundColor: colors.successLight}]}
              onPress={handleCompleteTodo}>
              <Animated.View style={{opacity: first}}>
                <Icon type={'material'} name={'clear'} color={colors.white} />
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

    useEffect(() => {
      if (!props.isTimerEnabled) {
        const now = Date.now();

        const todo: ITodo = {
          ...props,
          status,
          startedAt: now,
          pausedAt: now,
        };

        dispatch(editTodo(todo));
      }
    }, [status]);

    return (
      <Swipeable
        ref={swipeRef}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableOpen={handleSwipeableOpen}
        onSwipeableWillOpen={handleSwipeableWillOpen}
        containerStyle={styles.wrapper}>
        <View style={[styles.row, styles.wrapper]}>
          <View style={styles.infoWrapper}>
            <View style={[styles.inline, styles.titleWrapper]}>
              <View style={styles.circleWrapper}>
                <Circle size={CIRCLE_SIZE} color={props.color} />
              </View>
              <Text
                numberOfLines={1}
                lineBreakMode={'clip'}
                style={[
                  styles.title,
                  status === 'done' ? styles.todoSuccess : null,
                ]}>
                {props.title}
              </Text>
            </View>
            <Text style={styles.date}>
              created at{' '}
              {dateRef.hours < 10 ? `0${dateRef.hours}` : dateRef.hours}:
              {dateRef.minutes < 10 ? `0${dateRef.minutes}` : dateRef.minutes}
            </Text>
          </View>

          {props.isTimerEnabled ? <Timer item={props} status={status} /> : null}
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
      paddingHorizontal: getModerateScale(14),
      width: Dimensions.get('window').width,
      flexDirection: 'row',
    },
    wrapper: {
      backgroundColor: colors.white,
    },
    inline: {
      flexDirection: 'row',
    },
    infoWrapper: {
      flex: 1,
      maxWidth: '75%',
    },
    title: {
      fontSize: fonts.medium,
      color: colors.black,
      fontWeight: '500',
      paddingTop: 4,
      marginBottom: 4,
      width: '100%',
    },
    titleWrapper: {
      alignItems: 'center',
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
    todoSuccess: {
      textDecorationLine: 'line-through',
    },
    circleWrapper: {
      marginRight: 6,
    },
  });

  return {styles};
};
