import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../utils/hooks';

interface IProps {
  size: number;
  color: string;
}

const Circle = (props: IProps) => {
  const {styles} = useStyles(props.size);

  return (
    <View
      style={[
        styles.circle,
        props.color === 'transparent' ? styles.circleBorder : null,
        {backgroundColor: props.color ?? 'red'},
      ]}
    />
  );
};

export default Circle;

const useStyles = (size: number) => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    circle: {
      width: size ?? 16,
      height: size ?? 16,
      borderRadius: size ?? 16,
    },
    circleBorder: {
      borderWidth: 2,
      borderColor: colors.grey,
    },
  });

  return {styles};
};
