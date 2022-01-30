import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../utils/hooks';

interface ITitle {
  text?: string;
  color?: string;
  size?: number;
}

const Title = (props: ITitle) => {
  const {colors, userTheme} = useTheme();
  const theme = StyleSheet.create({
    text: {
      color: props.color ?? userTheme.text,
      fontSize: props.size ?? 24,
      fontWeight: 'bold',
    },
  });

  return <Text style={theme.text}>{props.text ?? 'Unnamed'}</Text>;
};

export default Title;
