import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../assets/hooks';

interface ITitle {
  text?: string;
  color?: string;
  size?: number;
}

const Title = (props: ITitle) => {
  const {colors} = useTheme();
  const theme = StyleSheet.create({
    text: {
      color: props.color ?? colors.black,
      fontSize: props.size ?? 24,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={theme.text}>{props.text ?? 'Unnamed'}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
