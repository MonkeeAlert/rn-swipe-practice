import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DefaultCheckbox from '../../components/DefaultCheckbox';
import GoBackButton from '../../components/GoBackButton';
import Title from '../../components/Title';
import {clearAllTodos} from '../../store/actions/todosActions';
import {changeTheme} from '../../store/actions/userActions';
import {getTodosState, getUserState} from '../../store/rootSelectors';
import {useTheme} from '../../utils/hooks';
import {getModerateScale} from '../../utils/Scaling';
import {TableButton} from './Components/TableButton';
import TableRow from './Components/TableRow';

export const SettingsScreen = () => {
  const {styles, fonts} = useStyles();
  const {list} = useSelector(getTodosState);
  const {isDarkTheme} = useSelector(getUserState);
  const dispatch = useDispatch();

  const clearTodos = () => dispatch(clearAllTodos());

  const toggleTheme = () => {
    dispatch(changeTheme());
  };

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
          <DefaultCheckbox
            title={'Dark theme'}
            onToggle={toggleTheme}
            isActive={isDarkTheme}
          />
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
  const {fonts, userTheme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: userTheme.background,
      flex: 1,
    },
    header: {
      marginTop: 50,
      marginBottom: 20,
      zIndex: 1,
    },
    mainWrapper: {
      paddingHorizontal: 15,
      position: 'relative',
    },
    back: {
      marginTop: 20,
      marginLeft: -getModerateScale(10),
      alignItems: 'flex-start',
      zIndex: 1,
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
