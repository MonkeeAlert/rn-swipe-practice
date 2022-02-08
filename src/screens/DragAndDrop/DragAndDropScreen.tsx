/**
 * tutorial below was used as a short guide
 *
 * @see https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/season4/src/Chrome
 */

import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../utils/hooks';
import {useNavigation} from '@react-navigation/native';
import {Cube} from './Components/Cube';
import {COLS, createData, ROWS, SIZE} from './Config/config';
import {useSharedValue} from 'react-native-reanimated';

const CUBES = 4;

const DATA = createData(CUBES);

const DragAndDropScreen = () => {
  const {styles} = useStyles();
  const {goBack} = useNavigation();

  const map = useSharedValue(
    Object.assign({}, ...Object.keys(DATA).map((i, k) => ({[DATA[i].id]: k}))),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Time to drag some cubes</Text>
      </View>
      <View style={styles.cubes}>
        {Object.keys(DATA).map(i => (
          <Cube
            key={`Cube_${DATA[i].id}`}
            id={DATA[i].id}
            title={DATA[i].title}
            map={map}
          />
        ))}
      </View>

      <Pressable onPress={goBack} style={styles.goBackButton}>
        <Text style={styles.goBackText}>Back</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default DragAndDropScreen;

const useStyles = () => {
  const {userTheme, fonts} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cubes: {
      width: SIZE * (COLS + 1),
      height: SIZE * (ROWS + 1),
    },
    header: {
      bottom: 60,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: userTheme.text,
      fontSize: fonts.large + 4,
    },
    goBackButton: {
      position: 'absolute',
      bottom: 50,
    },
    goBackText: {
      fontSize: fonts.medium,
      color: userTheme.text,
    },
  });

  return {styles};
};
