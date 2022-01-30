import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {Dimensions, Pressable, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {defaultTodoPlaceholders, todoColors} from '../../utils/constants';
import {useTheme} from '../../utils/hooks';
import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import Title from '../../components/Title';
import {ITodo, TodosActions} from '../../store/types/todosTypes';
import DefaultCheckbox from '../../components/DefaultCheckbox';
import Circle from '../../components/Circle';
import ModalColor from '../../components/ModalColor';
import GoBackButton from '../../components/GoBackButton';
import {getModerateScale} from '../../utils/Scaling';

const CIRCLE_SIZE = 26;

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
  const [isModalVisible, showModal] = useState(false);
  const [color, setColor] = useState(todoColors[0]);

  const handleSubmit = () => {
    if (value !== '') {
      const todo = {
        title: value,
        status: willStartOnCreate ? 'active' : 'default',
        colorParams: color,
        isTimerEnabled,
      } as ITodo;

      dispatch({
        type: TodosActions.ADD_TODO,
        payload: todo,
      });
      navigation.goBack();
    }
  };

  const handleSetColor = (c: any) => {
    setColor(c);
    showModal(false);
  };

  const handleEnableTimer = () => enableTimer(prev => !prev);
  const handleStartOnCreate = () => setToStartOnCreate(prev => !prev);
  const handleModalVisibility = () => showModal(prev => !prev);

  useEffect(() => {
    if (!isTimerEnabled) {
      setToStartOnCreate(false);
    }
  }, [isTimerEnabled]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapper}>
        <View style={styles.back}>
          <GoBackButton size={32} />
        </View>

        <View style={styles.header}>
          <Title text={'Add todo'} />
        </View>
        <View style={styles.row}>
          <DefaultInput
            value={value}
            placeholder={placeholderRef}
            onChangeText={setValue}
            maxLength={28}
          />
        </View>
        <Pressable onPress={handleModalVisibility}>
          <View style={[styles.row, styles.inline]}>
            <Text style={styles.text}>{color.title}</Text>
            <Circle size={CIRCLE_SIZE} color={color.color} />
          </View>
        </Pressable>
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

      <ModalColor
        isVisible={isModalVisible}
        onClose={handleModalVisibility}
        onColorSet={handleSetColor}
      />
    </SafeAreaView>
  );
};

const useStyles = () => {
  const {colors, fonts, userTheme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: userTheme.background,
      flex: 1,
    },
    header: {
      marginTop: 50,
      marginBottom: 20,
    },
    mainWrapper: {
      paddingHorizontal: 15,
      position: 'relative',
    },
    submitContainer: {
      width: Dimensions.get('screen').width - 30,
      position: 'absolute',
      bottom: 30,
      left: 15,
    },
    text: {
      fontWeight: '500',
      fontSize: fonts.medium,
      color: userTheme.text,
    },
    row: {
      marginBottom: 20,
    },
    inline: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    transparentCircle: {
      borderWidth: 2,
      borderColor: colors.grey,
    },
    color: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE,
    },
    back: {
      marginTop: 20,
      marginLeft: -getModerateScale(10),
      alignItems: 'flex-start',
    },
  });

  return {styles};
};
