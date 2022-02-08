import React, {useRef, useState} from 'react';
import {View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DefaultCheckbox from '../../components/DefaultCheckbox';
import GoBackButton from '../../components/GoBackButton';
import Title from '../../components/Title';
import {clearAllTodos} from '../../store/actions/todosActions';
import {changeTheme} from '../../store/actions/userActions';
import {getTodosState, getUserState} from '../../store/rootSelectors';
import {useTheme} from '../../utils/hooks';
import {getModerateScale} from '../../utils/Scaling';
import {ThemeCircle} from './Components/ThemeCircle';
import {TableButton} from './Components/TableButton';
import TableRow from './Components/TableRow';

export const SettingsScreen = () => {
  const {styles, fonts, colors} = useStyles();
  const {list} = useSelector(getTodosState);
  const {isDarkTheme} = useSelector(getUserState);
  const [isDarkMode, setDarkMode] = useState(isDarkTheme);

  const previousMode = useRef(isDarkTheme).current;

  const dispatch = useDispatch();

  const clearTodos = () => dispatch(clearAllTodos());
  const changeThemeOnReturn = () => {
    return previousMode !== isDarkMode ? dispatch(changeTheme()) : null;
  };
  const toggleTheme = () => setDarkMode(prev => !prev);

  const color = isDarkMode ? colors.white : colors.black;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={color}
        barStyle={`${isDarkMode ? 'light' : 'dark'}-content`}
      />
      <View style={styles.mainWrapper}>
        <View style={styles.back}>
          <GoBackButton
            size={32}
            color={color}
            onReturn={changeThemeOnReturn}
          />
        </View>

        <View style={styles.header}>
          <Title
            text={'Settings'}
            isAnimated={true}
            stateToAnimate={isDarkMode}
          />
        </View>

        <View style={[styles.block, styles.row]}>
          <Title
            text={'Dark theme'}
            size={fonts.medium}
            isAnimated={true}
            stateToAnimate={isDarkMode}
          />
          <DefaultCheckbox onToggle={toggleTheme} isActive={isDarkTheme} />
          <ThemeCircle isEnabled={isDarkMode} />
        </View>

        <View style={styles.block}>
          <Title
            text={'Todos'}
            size={fonts.large}
            isAnimated={true}
            stateToAnimate={isDarkMode}
          />
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
  const {fonts, colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
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
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  return {styles, fonts, colors};
};
