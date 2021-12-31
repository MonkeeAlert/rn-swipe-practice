import React from 'react';
import {StyleSheet, View} from 'react-native';
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
      paddingBottom: 6,
      paddingLeft: 0,
      paddingRight: props.icon ? props.icon?.size + 4 : 0,
      borderColor: colors.darkGrey,
      fontSize: fonts.regular,
      color: colors.black,
      ...props.style,
    },
    icon: {
      position: 'absolute',
      top: getModerateScale((HEIGHT - (props.icon?.size ?? 16)) / 2),
      right: 0,
      zIndex: 2,
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
    </View>
  );
};

export default DefaultInput;
