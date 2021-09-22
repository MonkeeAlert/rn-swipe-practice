import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {defaultTodoPlaceholders} from '../../utils/constants';
import {useTheme} from '../../utils/hooks';
import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import Title from '../../components/Title';

export const AddTodoScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [placeholder, setPlaceholder] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const placeholders = defaultTodoPlaceholders;

    setPlaceholder(
      placeholders[Math.floor(Math.random() * placeholders.length - 1) + 1],
    );
  }, []);

  const addTodo = () => {
    const timestamp = Date.now();

    if (value === '') {
      // Error handle ...
    } else {
      console.log('@addTodo', value, timestamp);
      navigation.goBack();
    }
  };

  const handleInput = (e: string) => {
    setValue(e);
  };

  const theme = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    input: {
      borderWidth: 1,
      borderRadius: 3,
      height: 54,
      paddingHorizontal: 12,
    },
  });

  return (
    <SafeAreaView style={theme.container}>
      <View style={styles.mainWrapper}>
        <View style={styles.header}>
          <Title text={'New todo'} />
        </View>
        <DefaultInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleInput}
        />
      </View>
      <View style={styles.submitContainer}>
        <DefaultButton text={'Add'} onPress={addTodo} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
