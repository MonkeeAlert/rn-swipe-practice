import Swipeable from 'react-native-gesture-handler/Swipeable';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import {getDate} from '../../../utils/functions';
import {useTheme} from '../../../utils/hooks';
import {RectButton} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';

export interface IListItem {
  id: number;
  created_at: number;
  started_at: number;
  finished_at: number;
  category: string;
  title: string;
  completed: boolean;
}

interface IListItemStatus {
  status: 'Not started' | 'In progress' | 'Completed';
}

export const ListItem = (props: IListItem) => {
  const {colors} = useTheme();
  const [createdAt, setCreatedAt] = useState('');
  const [status, setStatus] =
    useState<IListItemStatus['status']>('Not started');

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
  });

  useEffect(() => {
    if (props.created_at) {
      const d = getDate(props.created_at).toString();
      const s: IListItemStatus['status'] =
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
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    const deleteTodo = () => {
      console.log('@delete');
    };

    return (
      <View style={styles.inline}>
        <RectButton style={theme.button} onPress={deleteTodo}>
          <View>
            <Icon type={'material'} name={'delete'} color={colors.error} />
          </View>
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
          <View>
            <Icon type={'material'} name={'done'} color={colors.darkGrey} />
          </View>
        </RectButton>
        <RectButton style={theme.button} onPress={editTodo}>
          <View>
            <Icon type={'material'} name={'edit'} color={colors.darkGrey} />
          </View>
        </RectButton>
        <RectButton style={theme.button} onPress={changeTodoState}>
          <View>
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
