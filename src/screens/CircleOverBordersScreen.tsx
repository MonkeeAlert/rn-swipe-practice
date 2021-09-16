import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Borders} from './CircleOverBorders/Borders';
import {Circle} from './CircleOverBorders/Circle';

const CircleOverBordersScreen = () => {
  return (
    <View style={styles.container}>
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
});
