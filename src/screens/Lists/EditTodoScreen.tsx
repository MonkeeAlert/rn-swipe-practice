import {useNavigation, useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/core';
import React, {useState, useRef} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {useTheme} from '../../utils/hooks';
import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import Title from '../../components/Title';
import {ITodo, TodosActions} from '../../store/types/todosTypes';
import {RootStackParamList} from '../../utils/stackNavigation';

export const EditTodoScreen = () => {
  const {styles} = useStyles();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute<RouteProp<RootStackParamList, 'EditTodo'>>();

  const [value, setValue] = useState('');
  const placeholderRef = useRef(
    route.params.title?.length > 50
      ? `${route.params.title.slice(0, 47)}...`
      : route.params.title,
  ).current;

  const handleSubmit = () => {
    if (value === '') {
      // Error handle ...
    } else {
      const todo = {id: route.params.id, title: value} as ITodo;

      dispatch({
        type: TodosActions.EDIT_TODO,
        payload: todo,
      });

      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapper}>
        <View style={styles.header}>
          <Title text={'Edit todo'} />
        </View>
        <DefaultInput
          value={value}
          placeholder={placeholderRef}
          onChangeText={setValue}
        />
      </View>
      <View style={styles.submitContainer}>
        <DefaultButton text={'Edit'} onPress={handleSubmit} />
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
