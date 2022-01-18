import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../utils/hooks';

interface IProps {
  title: string;
  onPress: () => void;
}

export const TableButton = (props: IProps) => {
  const {styles} = useStyles();

  const handlePress = () => {
    if (props.onPress) {
      props.onPress();
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title ?? 'Unnamed Button'}</Text>
      </View>
    </Pressable>
  );
};

const useStyles = () => {
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginVertical: 14,
    },
    title: {
      fontSize: fonts.regular,
      fontWeight: '700',
      color: colors.error,
    },
  });

  return {styles};
};
