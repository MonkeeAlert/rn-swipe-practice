import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {TextInput, TextInputProps} from 'react-native';
import {Icon} from 'react-native-elements';
import {useTheme} from '../utils/hooks';
import {getModerateScale} from '../utils/Scaling';
import {IIcon} from '../utils/types';

interface IProps extends TextInputProps {
  icon?: IIcon;
}

const HEIGHT = 42;

const DefaultInput = (props: IProps) => {
  const {colors, fonts} = useTheme();

  const theme = StyleSheet.create({
    container: {
      position: 'relative',
      height: getModerateScale(HEIGHT),
    },
    input: {
      borderBottomWidth: 1,
      height: getModerateScale(HEIGHT),
      paddingBottom: Platform.OS === 'android' ? 6 : 0,
      paddingLeft: 0,
      paddingRight: props.icon?.size ? props.icon?.size + 4 : 0,
      borderColor: colors.darkGrey,
      fontSize: fonts.regular,
      color: colors.black,
      ...(props.style as object),
    },
    icon: {
      position: 'absolute',
      top: getModerateScale((HEIGHT - (props.icon?.size ?? 16)) / 2),
      right: 0,
      zIndex: 2,
    },
    maxLength: {
      position: 'absolute',
      top: getModerateScale(HEIGHT - fonts.regular) / 2,
      right: 0,
      zIndex: 2,
      color:
        props.value?.length &&
        props.maxLength &&
        props.value?.length >= props.maxLength
          ? colors.error
          : colors.darkGrey,
    },
  });

  return (
    <View style={theme.container}>
      <TextInput
        {...props}
        placeholderTextColor={colors.darkGrey}
        style={theme.input}
        numberOfLines={1}
      />
      {props.icon ? (
        <Icon
          name={props.icon.name}
          type={props.icon.family}
          size={props.icon.size ?? 16}
          color={props.icon.color ?? colors.darkGrey}
          containerStyle={theme.icon}
        />
      ) : null}
      {props.maxLength ? (
        <Text style={theme.maxLength}>
          {props.value?.length}/{props.maxLength}
        </Text>
      ) : null}
    </View>
  );
};

export default DefaultInput;
