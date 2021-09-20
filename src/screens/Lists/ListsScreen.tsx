import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {List} from './Components/List';
import data from '../../assets/todoList.json';

const DATA = data;

const TodosScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <List data={DATA.todos} />
    </SafeAreaView>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
