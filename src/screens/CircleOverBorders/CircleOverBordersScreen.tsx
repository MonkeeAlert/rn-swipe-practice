import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from '../../assets/hooks';
import {Borders} from './Components/Borders';
import {Circle} from './Components/Circle';

const CircleOverBordersScreen = () => {
  const {colors} = useTheme();
  const theme = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },
    text: {
      fontSize: 21,
      color: colors.black,
    },
  });

  return (
    <View style={[styles.container, theme.container]}>
      <View style={styles.header}>
        <Text style={theme.text}>Drag that circle</Text>
        <Text style={theme.text}>over borders</Text>
      </View>
      <Borders>
        <Circle />
      </Borders>
    </View>
  );
};

export default CircleOverBordersScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'relative',
    bottom: 30,
    alignItems: 'center',
  },
});
