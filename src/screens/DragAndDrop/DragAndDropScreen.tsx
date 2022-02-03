import {
  LayoutRectangle,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '../../utils/hooks';
import {useNavigation} from '@react-navigation/native';
import {Cube} from './Components/Cube';
import {borders} from '../../utils/constants';
import {ICube} from '../../utils/types';
import {useSharedValue} from 'react-native-reanimated';

const CUBES = 2;

const DragAndDropScreen = () => {
  const {styles} = useStyles();
  const {goBack} = useNavigation();

  const [map, setMap] = useState({});
  // const [overflowed, setOverflowed] = useShared(false);
  // const [active, setActive] = useState<string | null>(null);

  const active = useSharedValue<string | null>(null);

  const handleSetMap = (item: ICube) => {
    setMap(prev => ({...prev, ...item}));
  };

  // const handleDraggable = (key: string) => {
  //   console.log('@key', key);
  // };

  // const checkOverflowing = (current: string, draggable: string) => {
  //   console.log('@')
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Time to drag some cubes</Text>
      </View>
      <View style={styles.cubes}>
        {[...new Array(CUBES)].map((_, k) => (
          <Cube
            key={`Cube_${k}`}
            title={`${k + 1}`}
            activeRef={active}
            map={map}
            isActive={`${k + 1}` === active.value}
            // isOverflowed={isOverflowed}
            // onOverflowing={(k: number) => checkOverflowing(`${k + 1}`, key)}
            // onDrag={handleDraggable}
            onLoading={handleSetMap}
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
      width: borders,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    header: {
      position: 'relative',
      bottom: 30,
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
