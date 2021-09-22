import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, TextInputProps} from 'react-native';
import {useTheme} from '../utils/hooks';

const DefaultInput = (props: TextInputProps) => {
  const {colors} = useTheme();
  const theme = StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderRadius: 3,
      height: 42,
      paddingBottom: 4,
      paddingHorizontal: 0,
      borderColor: colors.grey,
      fontSize: 16,
    },
  });

  return <TextInput {...props} style={theme.container} />;
};

export default DefaultInput;
