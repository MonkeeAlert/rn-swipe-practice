import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Borders} from './CircleOverBorders/Borders';
import {Circle} from './CircleOverBorders/Circle';

const CircleOverBordersScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Drag that circle over borders</Text>
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
  },
  text: {
    fontSize: 21,
  },
});
