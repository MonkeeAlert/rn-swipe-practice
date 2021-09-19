import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../../assets/hooks';
import {borders} from '../../../assets/constants';

interface IBorders {
  children: Element | Element[];
}

export const Borders = (props: IBorders) => {
  const {colors} = useTheme();

  const theme = StyleSheet.create({
    borders: {
      borderColor: colors.infoLight,
    },
  });

  return <View style={[styles.borders, theme.borders]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  borders: {
    width: borders,
    height: borders,
    borderWidth: 2,
    borderRadius: borders / 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
