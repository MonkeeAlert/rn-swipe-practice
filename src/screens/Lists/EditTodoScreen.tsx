import {useNavigation, useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/core';
import React, {useState, useRef} from 'react';
import {Dimensions, Pressable, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {useTheme} from '../../utils/hooks';
import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import Title from '../../components/Title';
import {ITodo, TodosActions} from '../../store/types/todosTypes';
import {RootStackParamList} from '../../utils/stackNavigation';
import ModalColor from '../../components/ModalColor';
import Circle from '../../components/Circle';
import DefaultCheckbox from '../../components/DefaultCheckbox';
import GoBackButton from '../../components/GoBackButton';
import {getModerateScale} from '../../utils/Scaling';

const CIRCLE_SIZE = 26;

export const EditTodoScreen = () => {
  const {styles} = useStyles();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute<RouteProp<RootStackParamList, 'EditTodo'>>();

  const [value, setValue] = useState(route.params.title);
  const [isModalVisible, showModal] = useState(false);
  const [isTimerEnabled, enableTimer] = useState(
    route.params.isTimerEnabled ?? false,
  );
  const [color, setColor] = useState(route.params.colorParams);

  const placeholderRef = useRef(
    route.params.title?.length > 50
      ? `${route.params.title.slice(0, 47)}...`
      : route.params.title,
  ).current;

  const handleSubmit = () => {
    if (value !== '') {
      const todo = {
        id: route.params.id,
        title: value,
        colorParams: color,
        isTimerEnabled,
      } as ITodo;

      dispatch({
        type: TodosActions.EDIT_TODO,
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
  const handleModalVisibility = () => showModal(prev => !prev);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapper}>
        <View style={styles.back}>
          <GoBackButton size={32} />
        </View>
        <View style={styles.header}>
          <Title text={'Edit todo'} />
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
      </View>

      <ModalColor
        isVisible={isModalVisible}
        onClose={handleModalVisibility}
        onColorSet={handleSetColor}
      />
      <View style={styles.submitContainer}>
        <DefaultButton text={'Edit'} onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const useStyles = () => {
  const {fonts, userTheme} = useTheme();

  const styles = StyleSheet.create({
    container: {
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
    row: {
      marginBottom: 20,
    },
    inline: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      fontWeight: '500',
      fontSize: fonts.medium,
      color: userTheme.text,
    },
    back: {
      marginTop: 20,
      marginLeft: -getModerateScale(10),
      alignItems: 'flex-start',
    },
  });

  return {styles};
};
