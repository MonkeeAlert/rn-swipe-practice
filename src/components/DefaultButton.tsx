import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, TouchableOpacity, ColorValue} from 'react-native';
import {useTheme} from '../utils/hooks';

interface IButton {
  text: string;
  backgroundColor?: ColorValue;
  textColor?: ColorValue;
  onPress: () => any;
}

const DefaultButton = (props: IButton) => {
  const {colors} = useTheme();
  const theme = StyleSheet.create({
    container: {
      backgroundColor: props.backgroundColor ?? colors.infoMain,
    },
    text: {
      color: props.textColor ?? colors.white,
    },
  });

  const handlePress = () => {
    if (props.onPress) {
      return props.onPress();
    } else {
      console.log('@action');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={[styles.container, theme.container]}>
          <Text style={[styles.text, theme.text]}>
            {props.text ?? 'Button'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DefaultButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    borderRadius: 3,
  },
  text: {
    fontSize: 16,
  },
});
