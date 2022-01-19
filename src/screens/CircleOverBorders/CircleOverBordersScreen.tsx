import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useTheme} from '../../utils/hooks';
import {Borders} from './Components/Borders';
import {Circle} from './Components/Circle';

const CircleOverBordersScreen = () => {
  const {styles} = useStyles();
  const {goBack} = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Drag that circle</Text>
        <Text style={styles.text}>over borders</Text>
      </View>
      <Borders>
        <Circle />
      </Borders>

      <Pressable onPress={goBack} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </View>
  );
};

export default CircleOverBordersScreen;

const useStyles = () => {
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
    },
    header: {
      position: 'relative',
      bottom: 30,
      alignItems: 'center',
    },
    button: {
      position: 'absolute',
      bottom: 50,
    },
    text: {
      color: colors.black,
      fontSize: fonts.large + 4,
    },
    buttonText: {
      fontSize: fonts.medium,
      color: colors.infoDark,
    },
  });

  return {styles};
};
