import {StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../../utils/hooks';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SCALE, SIZE, DURATION} from '../Config/config';

interface IProps {
  isEnabled: boolean;
}

export const ThemeCircle = (props: IProps) => {
  const {styles} = useStyles();

  const scale = useSharedValue(props.isEnabled ? SCALE : 0);
  const aStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  useAnimatedReaction(
    () => props.isEnabled,
    () => {
      scale.value = withTiming(props.isEnabled ? SCALE : 0, {
        duration: DURATION,
      });
    },
    [props.isEnabled],
  );

  return (
    <Animated.View pointerEvents={'none'} style={[styles.circle, aStyle]} />
  );
};

const useStyles = () => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    circle: {
      width: SIZE,
      height: SIZE,
      backgroundColor: colors.black,
      borderRadius: SIZE,
      position: 'absolute',
      right: 3,
      top: 3,
      zIndex: -1,
    },
  });

  return {styles};
};
