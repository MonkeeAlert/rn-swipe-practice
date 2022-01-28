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

const CIRCLE_SIZE = 26;
const DURATION = 5000;

export const SettingsScreen = () => {
  const {styles, fonts} = useStyles();
  const {list} = useSelector(getTodosState);
  const {theme} = useSelector(getUserState);
  const dispatch = useDispatch();

  const animationRef = useRef(new Animated.Value(0)).current;

  const [isDarkTheme, setDarkTheme] = useState(theme === 'dark');

  const clearTodos = () => dispatch(clearAllTodos());

  const _changeTheme = () => {
    setDarkTheme(prev => !prev);

    // if (isDarkTheme) {
    dispatch(changeTheme());
    // } else {
    //   setTimeout(() => dispatch(changeTheme()), DURATION / 10);
    // }
  };

  const themeInterpolation = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    Animated.timing(animationRef, {
      toValue: +isDarkTheme,
      useNativeDriver: false,
      duration: DURATION / (isDarkTheme ? 5 : 10),
    }).start();
  }, [isDarkTheme]);

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
            onToggle={_changeTheme}
            isActive={isDarkTheme}
          />
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [{scale: themeInterpolation}],
              },
            ]}
            pointerEvents={'none'}
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
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
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
    circle: {
      position: 'absolute',
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      right: 3,
      top: 3,
      borderRadius: 999999,
      backgroundColor: colors.black,
      zIndex: -1,
      elevation: -1,
    },
  });

  return {styles, fonts};
};
