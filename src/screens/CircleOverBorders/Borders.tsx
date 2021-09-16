import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useTheme} from '../../assets/hooks';

const SIZE = Dimensions.get('screen').width - 100;

interface IBorders {
  children: Element | Element[];
}

const Borders = (props: IBorders) => {
  const {colors} = useTheme();

  const theme = StyleSheet.create({
    borders: {
      borderColor: colors.darkBlue,
    },
  });

  return <View style={[styles.borders, theme.borders]}>{props.children}</View>;
};

export {Borders};

const styles = StyleSheet.create({
  borders: {
    width: SIZE,
    height: SIZE,
    borderWidth: 5,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
