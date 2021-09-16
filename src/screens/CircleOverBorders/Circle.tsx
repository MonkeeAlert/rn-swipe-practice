import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../assets/hooks';

const SIZE = 60;

const Circle = () => {
  const {colors} = useTheme();

  const theme = StyleSheet.create({
    circle: {
      backgroundColor: colors.blue,
    },
  });

  return <View style={[styles.circle, theme.circle]} />;
};

export {Circle};

const styles = StyleSheet.create({
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
});
