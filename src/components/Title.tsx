import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from 'react-native-elements';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '../utils/hooks';

interface ITitle {
  text?: string;
  color?: string;
  size?: number;
  isAnimated?: boolean;
  stateToAnimate?: boolean;
}

const Title = (props: ITitle) => {
  const {userTheme} = useTheme();

  const color = useDerivedValue(() => {
    return withTiming(props.stateToAnimate ? +props.stateToAnimate : 0);
  });

  const cStyles = useAnimatedStyle(() => {
    const c = interpolateColor(
      color.value,
      [0, 1],
      [colors.black, colors.white],
    );

    return {color: c};
  });

  const theme = StyleSheet.create({
    text: {
      color: props.color ?? userTheme.text,
      fontSize: props.size ?? 24,
      fontWeight: 'bold',
    },
  });

  const title = props.text ?? 'Unnamed';

  return props.isAnimated ? (
    <Animated.Text style={[theme.text, cStyles]}>{title}</Animated.Text>
  ) : (
    <Text style={theme.text}>{title}</Text>
  );
};

export default Title;
