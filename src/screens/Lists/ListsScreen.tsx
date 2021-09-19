import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {EmptyList} from './Components/EmptyList';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

// const Tabs = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen />
//       <Tab.Screen />
//       <Tab.Screen />
//       <Tab.Screen />
//     </Tab.Navigator>
//   )
// }

const TodosScreen = () => {
  const [list, setList] = useState([]);

  if (list.length === 0) {
    return (
      <View style={styles.empty}>
        <EmptyList />
      </View>
    );
  }
};

export default TodosScreen;

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
