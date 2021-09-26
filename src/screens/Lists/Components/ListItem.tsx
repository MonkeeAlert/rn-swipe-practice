import Swipeable from 'react-native-gesture-handler/Swipeable';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import {getDate} from '../../../utils/functions';
import {useTheme} from '../../../utils/hooks';
import {RectButton} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {ITodo} from '../../../store/types/todosTypes';
import {deleteTodo} from '../../../store/actions/todosActions';

interface ITodoStatus {
  status: 'Not started' | 'In progress' | 'Completed';
}

export const ListItem = (props: ITodo) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [createdAt, setCreatedAt] = useState('');
  const [status, setStatus] = useState<ITodoStatus['status']>('Not started');

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
    leftButtonsBorder: {
      borderColor: colors.error,
      borderRightWidth: 1,
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
  }, []);

  const renderLeftActions = (_, dragX: any) => {
    const transition = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 1, 1],
    });

    const handleDeleteTodo = () => {
      dispatch(deleteTodo(props.id));
    };

    return (
      <View style={styles.inline}>
        <RectButton
          style={[theme.button, theme.buttonDelete]}
          onPress={handleDeleteTodo}>
          <Animated.View style={{opacity: transition}}>
            <Icon type={'material'} name={'delete'} color={colors.white} />
          </Animated.View>
        </RectButton>
      </View>
    );
  };

  const renderRightActions = (_, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
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
          <View style={theme.rightButtonsBorder}>
            <Icon type={'material'} name={'done'} color={colors.darkGrey} />
          </View>
        </RectButton>
        <RectButton style={theme.button} onPress={editTodo}>
          <View style={theme.rightButtonsBorder}>
            <Icon type={'material'} name={'edit'} color={colors.darkGrey} />
          </View>
        </RectButton>
        <RectButton style={theme.button} onPress={changeTodoState}>
          <View style={theme.rightButtonsBorder}>
            <Icon
              type={'material'}
              name={'play-arrow'}
              color={colors.darkGrey}
            />
          </View>
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
