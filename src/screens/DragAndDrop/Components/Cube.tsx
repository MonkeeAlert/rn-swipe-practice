import {Text, StyleSheet, PanResponder, Animated} from 'react-native';
import React, {useRef} from 'react';
import {defaultBorderRadius} from '../../../utils/constants';
import {useTheme} from '../../../utils/hooks';

interface IProps {
  title: string;
}

const SIZE = 64;
const INITIAL_POINTS = {x: 0, y: 0};

export const Cube = (props: IProps) => {
  const {styles} = useStyles();

  // drag'n'drop refs
  const translation = useRef(new Animated.ValueXY(INITIAL_POINTS)).current;
  const panResponderHandler = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestures) => {
        translation.setValue({x: gestures.dx, y: gestures.dy});
      },
      onPanResponderRelease: () => {
        Animated.spring(translation, {
          toValue: INITIAL_POINTS,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateX: translation.x}, {translateY: translation.y}],
        },
      ]}
      {...panResponderHandler.panHandlers}>
      <Text style={styles.text}>{props.title ?? 'Title'}</Text>
    </Animated.View>
  );
};

const useStyles = () => {
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: SIZE,
      height: SIZE,
      borderWidth: 2,
      borderRadius: defaultBorderRadius,
      borderStyle: 'dashed',
      borderColor: colors.darkGrey,
      alignItems: 'center',
      justifyContent: 'center',
      margin: SIZE / 2,
    },
    text: {
      color: colors.darkGrey,
      fontSize: fonts.medium,
    },
  });

  return {styles};
};
