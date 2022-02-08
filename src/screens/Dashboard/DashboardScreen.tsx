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

      {routes.map((s, k) => (
        <NavigationLink
          key={s.key}
          title={s.title}
          route={s.route}
          color={s.color}
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
      paddingHorizontal: 15,
    },
  });

  return {styles, userTheme};
};
