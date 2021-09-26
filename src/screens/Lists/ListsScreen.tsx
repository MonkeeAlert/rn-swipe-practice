import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {List} from './Components/List';
import {useSelector} from 'react-redux';

const TodosScreen = () => {
  const {list} = useSelector(state => state.todos);

  return (
    <SafeAreaView style={styles.container}>
      <List data={list} />
    </SafeAreaView>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
