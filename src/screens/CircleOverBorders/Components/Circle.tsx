import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Animated,
  PanResponder,
  PanResponderGestureState,
} from 'react-native';
import {borders} from '../../../utils/constants';
import {useTheme} from '../../../utils/hooks';

interface IProps {
  onOverBorders: (state: boolean) => void;
  onRelease: () => void;
}

const SIZE = 64;
const INITIAL_POINTS = {x: 0, y: 0};
const OUTER_RADIUS = borders / 2;
const GRANT_ANIMATION = {
  toValue: 0.5,
  duration: 300,
  useNativeDriver: true,
};
const RELEASE_ANIMATION = {
  toValue: 1,
  duration: 300,
  useNativeDriver: true,
};
const OVER_BORDERS_ANIMATIONS = {
  toValue: 2,
  duration: 300,
  useNativeDriver: true,
};

export const Circle = (props: IProps) => {
  const {styles} = useStyles();

  const [isOverBorders, setOverBorders] = useState(false);
  const [wasTouched, setWasTouched] = useState(false);

  const checkByGestures = (gestures: PanResponderGestureState) => {
    const overflowByXAxis = Math.abs(gestures.dx) > OUTER_RADIUS;
    const overflowByYAxis = Math.abs(gestures.dy) > OUTER_RADIUS;
    const overflowByCuts =
      Math.abs(gestures.dx) + Math.abs(gestures.dy) > OUTER_RADIUS + SIZE;

    return overflowByXAxis || overflowByYAxis || overflowByCuts;
  };

  // Handle gestures
  const touch = useRef(new Animated.ValueXY(INITIAL_POINTS)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const panResponderHandler = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (!wasTouched) {
          setWasTouched(true);
        }

        Animated.timing(opacity, GRANT_ANIMATION).start();
        Animated.timing(scale, GRANT_ANIMATION).start();
      },
      onPanResponderMove: (_, gestures) => {
        setOverBorders(checkByGestures(gestures));

        touch.setValue({x: gestures.dx, y: gestures.dy});
      },
      onPanResponderRelease: (_, gestures) => {
        Animated.timing(opacity, RELEASE_ANIMATION).start();
        Animated.timing(scale, RELEASE_ANIMATION).start();

        if (checkByGestures(gestures)) {
          props.onRelease();
        } else {
          Animated.spring(touch, {
            toValue: INITIAL_POINTS,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (wasTouched) {
      if (isOverBorders) {
        Animated.timing(opacity, GRANT_ANIMATION).start();
        Animated.timing(scale, OVER_BORDERS_ANIMATIONS).start();
      } else {
        Animated.timing(opacity, GRANT_ANIMATION).start();
        Animated.timing(scale, GRANT_ANIMATION).start();
      }

      props.onOverBorders(isOverBorders);
    }
  }, [isOverBorders, wasTouched]);

  return (
    <Animated.View
      style={[
        styles.circle,
        {
          transform: [
            {translateX: touch.x},
            {translateY: touch.y},
            {scale: scale},
          ],
          opacity: opacity,
        },
      ]}
      {...panResponderHandler.panHandlers}
    />
  );
};

const useStyles = () => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    circle: {
      width: SIZE,
      height: SIZE,
      borderRadius: SIZE / 2,
      backgroundColor: colors.infoMain,
    },
  });

  return {styles};
};
