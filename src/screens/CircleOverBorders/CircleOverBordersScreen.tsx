import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useTheme} from '../../utils/hooks';
import {Borders} from './Components/Borders';
import {Circle} from './Components/Circle';

const CircleOverBordersScreen = () => {
  const {styles} = useStyles();
  const {goBack} = useNavigation();

  const [isOverBorders, setOverBorders] = useState(false);

  const handleOverBorders = (s: boolean) => setOverBorders(s);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isOverBorders ? (
          <Text style={styles.text}>Now you can exit</Text>
        ) : (
          <>
            <Text style={styles.text}>Drag that circle</Text>
            <Text style={styles.text}>over borders to exit</Text>
          </>
        )}
      </View>
      <Borders>
        <Circle onOverBorders={handleOverBorders} onRelease={goBack} />
      </Borders>

      <Pressable onPress={goBack} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </View>
  );
};

export default CircleOverBordersScreen;

const useStyles = () => {
  const {fonts, userTheme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: userTheme.background,
    },
    header: {
      position: 'relative',
      bottom: 30,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 65,
    },
    button: {
      position: 'absolute',
      bottom: 50,
    },
    text: {
      color: userTheme.text,
      fontSize: fonts.large + 4,
    },
    buttonText: {
      fontSize: fonts.medium,
      color: userTheme.text,
    },
  });

  return {styles};
};
