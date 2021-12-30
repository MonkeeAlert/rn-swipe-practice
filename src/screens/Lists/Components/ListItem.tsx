import Swipeable from 'react-native-gesture-handler/Swipeable';
import React, {useRef, useState, memo, forwardRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import {getDate} from '../../../utils/functions';
import {useTheme} from '../../../utils/hooks';
import {RectButton} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {ITodo, TodosActions} from '../../../store/types/todosTypes';
import {deleteTodo} from '../../../store/actions/todosActions';
import {useNavigation} from '@react-navigation/native';
import {getModerateScale} from '../../../utils/Scaling';
import {RootStackParamList} from '../../../utils/stackNavgation';
import {StackNavigationProp} from '@react-navigation/stack';
import {Timer} from './Timer';

interface ITodoProps extends ITodo {
  selectedCategory: ITodo['status'];
}

const areItemsEqual = (prev: ITodoProps, next: ITodoProps) => {
  return (
    prev.started_at === next.started_at && prev.finished_at === next.finished_at
  );
};

export const ListItem = memo(
  forwardRef((props: ITodoProps, previousRef: any) => {
    const {colors} = useTheme();
    const {styles} = useStyles();
    const dispatch = useDispatch();
    const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

    const swipeRef = useRef<Swipeable>(null);

    const [status, setStatus] = useState<ITodo['status']>(checkStatus());

    function checkStatus() {
      return props.wasCompleted ? 'done' : props.status;
    }

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
            <Text
              style={[
                styles.title,
                status === 'done' ? styles.todoSuccess : null,
              ]}>
              {props.title}
            </Text>
            <Text style={styles.date}>
              {getDate(props.created_at).toString()}
            </Text>
          </View>

          <Timer item={props} status={status} />
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
    todoSuccess: {
      textDecorationLine: 'line-through',
    },
  });

  return {styles};
};
