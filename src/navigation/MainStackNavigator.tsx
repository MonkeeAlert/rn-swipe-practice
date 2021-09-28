import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {ScrollView, StatusBar, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {useTheme} from '../utils/hooks';
import {routes} from '../assets/routes';
import NavigationLink from '../components/NavigationLink';
import Title from '../components/Title';
import {HeaderIcon} from '../components/HeaderIcon';

import CircleOverBordersScreen from '../screens/CircleOverBorders/CircleOverBordersScreen';
import TodosScreen from '../screens/Lists/ListsScreen';
import {navigate, navigationRef} from '../navigation/RootNavigation';
import {DataInputScreen} from '../screens/HighOrderScreens/DataInputScreen';
import {addTodo} from '../store/actions/todosActions';
import {ITodo} from '../store/types/todosTypes';
import {useDispatch} from 'react-redux';

const RootStack = createStackNavigator();

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

const MainStackScreen = () => {
  const dispatch = useDispatch();

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
              headerRight: () => (
                <HeaderIcon
                  name={'add'}
                  type={'material'}
                  onPress={() =>
                    navigate('Modal_Data', {
                      title: 'Add todo',
                      button: {
                        text: 'Add',
                        action: (todo: ITodo) => dispatch(addTodo(todo)),
                      },
                    })
                  }
                />
              ),
            }}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <RootStack.Screen
            name={'Modal_Data'}
            component={DataInputScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator:
                CardStyleInterpolators.forRevealFromBottomAndroid,
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 15,
  },
});

export default MainStackScreen;
