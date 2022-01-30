import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {defaultBorderRadius} from '../../../utils/constants';
import {useTheme} from '../../../utils/hooks';

interface IProps {
  title: string;
}

const SIZE = 64;

export const Cube = (props: IProps) => {
  const {styles} = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title ?? 'Title'}</Text>
    </View>
  );
};

const useStyles = () => {
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: SIZE,
      height: SIZE,
      borderWidth: 2,
      borderRadius: defaultBorderRadius,
      borderStyle: 'dashed',
      borderColor: colors.darkGrey,
      alignItems: 'center',
      justifyContent: 'center',
      margin: SIZE / 2,
    },
    text: {
      color: colors.darkGrey,
      fontSize: fonts.medium,
    },
  });

  return {styles};
};
