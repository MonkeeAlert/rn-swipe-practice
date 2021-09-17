import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../assets/hooks';
import {BORDERS} from '../../assets/constants';

interface IBorders {
  children: Element | Element[];
}

export const Borders = (props: IBorders) => {
  const {colors} = useTheme();

  const theme = StyleSheet.create({
    borders: {
      borderColor: colors.lightBlue,
    },
  });

  return <View style={[styles.borders, theme.borders]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  borders: {
    width: BORDERS,
    height: BORDERS,
    borderWidth: 2,
    borderRadius: BORDERS / 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
