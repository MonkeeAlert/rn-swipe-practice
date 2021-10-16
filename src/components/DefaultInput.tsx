import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, TextInputProps} from 'react-native';
import {useTheme} from '../utils/hooks';
import {getModerateScale} from '../utils/Scaling';

const DefaultInput = (props: TextInputProps) => {
  const {colors, fonts} = useTheme();

  const theme = StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderRadius: 3,
      height: getModerateScale(42),
      paddingBottom: 4,
      paddingHorizontal: 0,
      borderColor: colors.grey,
      fontSize: fonts.regular,
      color: colors.black,
    },
  });

  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.grey}
      style={theme.container}
    />
  );
};

export default DefaultInput;
