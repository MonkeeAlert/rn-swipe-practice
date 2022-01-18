import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import GoBackButton from '../../components/GoBackButton';
import Title from '../../components/Title';
import {clearAllTodos} from '../../store/actions/todosActions';
import {getTodosState} from '../../store/rootSelectors';
import {useTheme} from '../../utils/hooks';
import {getModerateScale} from '../../utils/Scaling';
import {TableButton} from './Components/TableButton';
import TableRow from './Components/TableRow';

export const SettingsScreen = () => {
  const {styles, fonts} = useStyles();
  const {list} = useSelector(getTodosState);
  const dispatch = useDispatch();

  const clearTodos = () => dispatch(clearAllTodos());

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapper}>
        <View style={styles.back}>
          <GoBackButton size={32} />
        </View>

        <View style={styles.header}>
          <Title text={'Settings'} />
        </View>

        <View style={styles.block}>
          <Title text={'Todos'} size={fonts.large} />
          <View style={styles.divider} />
          <TableRow title={'All'} value={list?.length} />
          <TableRow
            title={'Not done'}
            value={list?.filter(i => i.status !== 'done').length}
          />
          <TableRow
            title={'Done'}
            value={list?.filter(i => i.status === 'done').length}
          />
          <TableButton title={'Clear todos'} onPress={clearTodos} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const useStyles = () => {
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    header: {
      marginTop: 50,
      marginBottom: 20,
    },
    mainWrapper: {
      paddingHorizontal: 15,
      position: 'relative',
    },
    back: {
      marginTop: 20,
      marginLeft: -getModerateScale(10),
      alignItems: 'flex-start',
    },
    block: {
      marginVertical: 10,
    },
    divider: {
      marginTop: 10,
    },
  });

  return {styles, fonts};
};
