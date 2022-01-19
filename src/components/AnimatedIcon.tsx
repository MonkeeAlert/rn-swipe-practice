import {Animated, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Icon, IconProps} from 'react-native-elements';

interface IProps extends IconProps {
  duration?: number;
  delay?: number;
}

const AnimatedIcon = (props: IProps) => {
  const animationRef = useRef(new Animated.Value(0)).current;

  const animation = {
    transform: [
      {
        rotateZ: animationRef.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '60deg'],
        }),
      },
    ],
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(animationRef, {
        toValue: 1,
        duration: props.duration ?? 1000,
        delay: props.delay ?? 1000,
        useNativeDriver: false,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
      }),
    ).start();
  }, []);

  return (
    <Animated.View style={animation}>
      <Icon {...props} />
    </Animated.View>
  );
};

export default AnimatedIcon;
