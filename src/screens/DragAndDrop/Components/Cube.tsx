import {
  Text,
  StyleSheet,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {defaultBorderRadius} from '../../../utils/constants';
import {useTheme} from '../../../utils/hooks';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {ICube} from '../../../utils/types';

interface IProps {
  title: string;
  map: {[name: string]: ICube};
  onLoading: (item: ICube) => void;
}

type Context = {
  x: number;
  y: number;
};

const SIZE = 64;

const findNeighbour = (
  item: {name: string; dx: number; dy: number},
  map: any,
) => {
  'worklet';

  for (const key in map) {
    if (key === item.name) {
      // skipping comparing element with itself
      continue;
    } else {
      // ...
    }
  }
};

export const Cube = (props: IProps) => {
  const {styles} = useStyles();

  const [layout, setLayout] =
    useState<LayoutChangeEvent['nativeEvent']['layout']>();

  // drag and drop shared values
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const tStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translationX.value},
        {translateY: translationY.value},
      ],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: Context) => {
      context.x = translationX.value;
      context.y = translationY.value;
    },
    onActive: (e, context: Context) => {
      translationX.value = e.translationX + context.x;
      translationY.value = e.translationY + context.y;

      findNeighbour(
        {
          name: props.title,
          dx: e.translationX,
          dy: e.translationY,
        },
        props.map,
      );
    },
    onEnd: () => {
      translationX.value = withSpring(0);
      translationY.value = withSpring(0);
    },
  });

  useEffect(() => {
    if (layout && props.onLoading) {
      props.onLoading({[props.title]: layout});
    }
  }, [layout]);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[styles.container, tStyle]}
        onLayout={e => setLayout(e.nativeEvent.layout)}>
        <Text style={styles.text}>{props.title ?? 'Title'}</Text>
      </Animated.View>
    </PanGestureHandler>
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
