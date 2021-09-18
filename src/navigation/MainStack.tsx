import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ScrollView, StatusBar, View} from 'react-native';
import NavigationLink from '../components/NavigationLink';
import Title from '../components/Title';
import {StyleSheet} from 'react-native';
import {useTheme} from '../assets/hooks';
import {routes} from '../assets/routes';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Dashboard = () => {
  const {colors} = useTheme();
  const theme = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },
  });

  return (
    <ScrollView style={theme.container}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Title text={'Trainings'} size={28} />
      </View>

      {routes.map(s => (
        <NavigationLink key={s.key} title={s.title} route={s.route} />
      ))}
    </ScrollView>
  );
};

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Dashboard'}
          component={Dashboard}
          options={{headerShown: false}}
        />
        {routes.map(s => (
          <Stack.Screen
            key={s.key}
            name={s.route}
            component={s.component}
            options={s.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 15,
  },
});

export default MainStack;
