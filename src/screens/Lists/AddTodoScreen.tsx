import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {defaultTodoPlaceholders} from '../../utils/constants';
import {useTheme} from '../../utils/hooks';
import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import Title from '../../components/Title';
import {ITodo, TodosActions} from '../../store/types/todosTypes';
import DefaultCheckbox from '../../components/DefaultCheckbox';

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
  const [isTimerEnabled, enableTimer] = useState(false);
  const [willStartOnCreate, setToStartOnCreate] = useState(false);

  const handleSubmit = () => {
    if (value === '') {
      // Error handle ...
    } else {
      const todo = {
        title: value,
        status: willStartOnCreate ? 'active' : 'default',
        isTimerEnabled,
      } as ITodo;

      dispatch({
        type: TodosActions.ADD_TODO,
        payload: todo,
      });
      navigation.goBack();
    }
  };

  const handleEnableTimer = () => enableTimer(prev => !prev);

  const handleStartOnCreate = () => setToStartOnCreate(prev => !prev);

  useEffect(() => {
    if (!isTimerEnabled) {
      setToStartOnCreate(false);
    }
  }, [isTimerEnabled]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapper}>
        <View style={styles.header}>
          <Title text={'Add todo'} />
        </View>
        <View style={styles.row}>
          <DefaultInput
            value={value}
            placeholder={placeholderRef}
            onChangeText={setValue}
          />
        </View>
        <View style={styles.row}>
          <DefaultCheckbox
            title={'Timer'}
            isActive={isTimerEnabled}
            onToggle={handleEnableTimer}
          />
        </View>
        {isTimerEnabled ? (
          <View style={styles.row}>
            <DefaultCheckbox
              title={'Start on create'}
              isActive={willStartOnCreate}
              onToggle={handleStartOnCreate}
            />
          </View>
        ) : null}
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
    row: {
      marginBottom: 15,
    },
  });

  return {styles};
};
