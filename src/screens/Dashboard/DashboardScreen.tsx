import {StyleSheet, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import {useTheme} from '../../utils/hooks';
import NavigationLink from './Components/NavigationLink';
import {routes} from '../../assets/routes';
import {useSelector} from 'react-redux';
import {getUserState} from '../../store/rootSelectors';
import {Header} from './Components/Header';

const DURATION = 500;

export default function DashboardScreen() {
  const {styles, userTheme} = useStyles();
  const {isDarkTheme} = useSelector(getUserState);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        backgroundColor={userTheme.background}
        barStyle={`${isDarkTheme ? 'light' : 'dark'}-content`}
      />

      <Header />

      {routes.map(({key, title, route, color, background}, k) => (
        <NavigationLink
          key={key}
          title={title}
          route={route}
          color={color}
          backgroundImage={background ?? 'diagonals'}
          delay={DURATION * k + DURATION}
        />
      ))}
    </ScrollView>
  );
}

const useStyles = () => {
  const {userTheme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: userTheme.background,
    },
  });

  return {styles, userTheme};
};
