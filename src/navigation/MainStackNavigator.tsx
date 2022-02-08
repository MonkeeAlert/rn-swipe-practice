import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {useTheme} from '../utils/hooks';
import {HeaderIcon} from '../components/HeaderIcon';

import CircleOverBordersScreen from '../screens/CircleOverBorders/CircleOverBordersScreen';
import TodosScreen from '../screens/Lists/TodosScreen';
import {navigate, navigationRef} from '../navigation/RootNavigation';
import {AddTodoScreen} from '../screens/Lists/AddTodoScreen';
import {EditTodoScreen} from '../screens/Lists/EditTodoScreen';
import GoBackButton from '../components/GoBackButton';
import {SettingsScreen} from '../screens/Settings/SettingsScreen';
import {useSelector} from 'react-redux';
import {getUserState} from '../store/rootSelectors';
import DragAndDropScreen from '../screens/DragAndDrop/DragAndDropScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';

const RootStack = createStackNavigator();

const MainStackScreen = () => {
  const {userTheme} = useTheme();
  const {isDarkTheme} = useSelector(getUserState);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{dark: isDarkTheme, colors: userTheme}}>
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
            component={DashboardScreen}
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
            name={'DragAndDrop'}
            component={DragAndDropScreen}
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

export default MainStackScreen;
