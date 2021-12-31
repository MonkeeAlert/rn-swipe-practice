import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {defaultTodoPlaceholders} from '../../utils/constants';
import {useTheme} from '../../utils/hooks';
import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import Title from '../../components/Title';
import {ITodo, TodosActions} from '../../store/types/todosTypes';

export const AddTodoScreen = () => {
  const {styles} = useStyles();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const placeholderRef = useRef(
    defaultTodoPlaceholders[
      Math.floor(Math.random() * defaultTodoPlaceholders.length - 1) + 1
    ],
  ).current;

  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value === '') {
      // Error handle ...
    } else {
      const todo = {title: value} as ITodo;

      dispatch({
        type: TodosActions.ADD_TODO,
        payload: todo,
      });
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapper}>
        <View style={styles.header}>
          <Title text={'Add todo'} />
        </View>
        <DefaultInput
          value={value}
          placeholder={placeholderRef}
          onChangeText={setValue}
        />
      </View>
      <View style={styles.submitContainer}>
        <DefaultButton text={'Add'} onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const useStyles = () => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    header: {
      paddingTop: 50,
    },
    mainWrapper: {
      paddingHorizontal: 15,
      position: 'relative',
    },
    submitContainer: {
      width: Dimensions.get('screen').width - 30,
      position: 'absolute',
      bottom: 15,
      left: 15,
    },
  });

  return {styles};
};
