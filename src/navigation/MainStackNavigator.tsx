import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Platform, ScrollView, StatusBar, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {useTheme} from '../utils/hooks';
import NavigationLink from '../components/NavigationLink';
import Title from '../components/Title';
import {HeaderIcon} from '../components/HeaderIcon';

import CircleOverBordersScreen from '../screens/CircleOverBorders/CircleOverBordersScreen';
import TodosScreen from '../screens/Lists/TodosScreen';
import {navigate, navigationRef} from '../navigation/RootNavigation';
import {routes} from '../assets/routes';
import {AddTodoScreen} from '../screens/Lists/AddTodoScreen';
import {EditTodoScreen} from '../screens/Lists/EditTodoScreen';
import GoBackButton from '../components/GoBackButton';
import {SettingsScreen} from '../screens/Settings/SettingsScreen';
import AnimatedIcon from '../components/AnimatedIcon';
import {useSelector} from 'react-redux';
import {getUserState} from '../store/rootSelectors';

const RootStack = createStackNavigator();

const Dashboard = () => {
  const {styles, userTheme} = useStyles();
  const {isDarkTheme} = useSelector(getUserState);

  const goToSettings = () => navigate('Settings');

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        backgroundColor={userTheme.background}
        barStyle={`${isDarkTheme ? 'light' : 'dark'}-content`}
      />
      <View style={styles.header}>
        <Title text={'Trainings'} size={28} />
        <View style={styles.icons}>
          <View style={styles.icon}>
            <AnimatedIcon
              size={28}
              color={userTheme.text}
              name={'settings-sharp'}
              type={'ionicon'}
              onPress={goToSettings}
              duration={1000}
              delay={3000}
            />
          </View>
        </View>
      </View>

      {routes.map(s => (
        <NavigationLink
          key={s.key}
          title={s.title}
          route={s.route}
          color={s.color}
        />
      ))}
    </ScrollView>
  );
};

const MainStackScreen = () => {
  const {userTheme} = useTheme();

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: userTheme.background,
          },
          headerTitleStyle: {
            color: userTheme.text,
          },
        }}>
        <RootStack.Group>
          <RootStack.Screen
            name={'Dashboard'}
            component={Dashboard}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name={'CircleOverBorders'}
            component={CircleOverBordersScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name={'Todos'}
            component={TodosScreen}
            options={{
              headerLeft: () => <GoBackButton size={32} />,
              headerRight: () => (
                <HeaderIcon
                  name={'add'}
                  type={'material'}
                  onPress={() => navigate('AddTodo')}
                />
              ),
            }}
          />
          <RootStack.Screen
            name={'Settings'}
            component={SettingsScreen}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Group>

        <RootStack.Group
          screenOptions={{
            presentation: 'modal',
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forRevealFromBottomAndroid,
          }}>
          <RootStack.Screen
            name={'AddTodo'}
            component={AddTodoScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name={'EditTodo'}
            component={EditTodoScreen}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const useStyles = () => {
  const {userTheme} = useTheme();

  const styles = StyleSheet.create({
    header: {
      marginTop: Platform.OS === 'android' ? 50 : 100,
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    container: {
      backgroundColor: userTheme.background,
      paddingHorizontal: 15,
    },
    icons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginLeft: 10,
    },
  });

  return {styles, userTheme};
};

export default MainStackScreen;
