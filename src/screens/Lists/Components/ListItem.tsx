import Swipeable from 'react-native-gesture-handler/Swipeable';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import {getDate} from '../../../utils/functions';
import {useTheme} from '../../../utils/hooks';
import {RectButton} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {ITodo} from '../../../store/types/todosTypes';
import {deleteTodo, restoreTodo} from '../../../store/actions/todosActions';

interface ITodoStatus {
  status: 'Not started' | 'In progress' | 'Completed';
}

export const ListItem = (props: ITodo) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [createdAt, setCreatedAt] = useState('');
  const [status, setStatus] = useState<ITodoStatus['status']>('Not started');
  const [isDeleted, setIsDeleted] = useState(false);

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
      backgroundColor: isDeleted ? colors.successMain : colors.error,
    },
    rightButtonsBorder: {
      borderColor: colors.grey,
      borderLeftWidth: 1,
    },
  });

  useEffect(() => {
    if (props.created_at) {
      const d = getDate(props.created_at).toString();
      const s: ITodoStatus['status'] =
        props.started_at !== props.finished_at
          ? props.completed
            ? 'Completed'
            : 'In progress'
          : 'Not started';

      setCreatedAt(d);
      setStatus(s);
    }
  }, [props.started_at, props.finished_at, props.created_at, props.completed]);

  useEffect(() => {
    setIsDeleted(props.category === 'deleted');
  }, [props.category]);

  const renderLeftActions = (_, dragX: any) => {
    const transition = dragX.interpolate({
      inputRange: [0, 60, 61],
      outputRange: [0, 1, 1],
    });

    const handleAction = () => {
      if (isDeleted) {
        dispatch(restoreTodo(props.id));
      } else {
        dispatch(deleteTodo(props.id));
      }
    };

    return (
      <View style={styles.inline}>
        <RectButton
          style={[theme.button, theme.buttonDelete]}
          onPress={handleAction}>
          <Animated.View style={{opacity: transition}}>
            <Icon
              type={'material'}
              name={isDeleted ? 'restore-from-trash' : 'delete'}
              color={colors.white}
            />
          </Animated.View>
        </RectButton>
      </View>
    );
  };

  const renderRightActions = (_, dragX: any) => {
    // TODO: must depend from screen size
    const first = dragX.interpolate({
      inputRange: [-61, -60, -30],
      outputRange: [1, 1, 0],
    });

    // TODO: must depend from screen size
    const second = dragX.interpolate({
      inputRange: [-131, -130, -100],
      outputRange: [1, 1, 0],
    });

    // TODO: must depend from screen size
    const third = dragX.interpolate({
      inputRange: [-181, -180, -150],
      outputRange: [1, 1, 0],
    });

    const changeTodoState = () => {
      console.log('@changeTodoState');
    };

    const editTodo = () => {
      console.log('@editTodo');
    };

    const completeTodo = () => {
      console.log('@completeTodo');
    };

    return (
      <View style={styles.inline}>
        <RectButton style={theme.button} onPress={completeTodo}>
          <Animated.View style={[theme.rightButtonsBorder, {opacity: third}]}>
            <Icon type={'material'} name={'done'} color={colors.darkGrey} />
          </Animated.View>
        </RectButton>
        <RectButton style={theme.button} onPress={editTodo}>
          <Animated.View style={[theme.rightButtonsBorder, {opacity: second}]}>
            <Icon type={'material'} name={'edit'} color={colors.darkGrey} />
          </Animated.View>
        </RectButton>
        <RectButton style={theme.button} onPress={changeTodoState}>
          <Animated.View style={[theme.rightButtonsBorder, {opacity: first}]}>
            <Icon
              type={'material'}
              name={'play-arrow'}
              color={colors.darkGrey}
            />
          </Animated.View>
        </RectButton>
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      <View style={[styles.row, theme.row]}>
        <View>
          <Text style={theme.title}>{props.title}</Text>
          <Text style={theme.date}>{createdAt}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: Dimensions.get('window').width,
  },
  inline: {
    flexDirection: 'row',
  },
});
