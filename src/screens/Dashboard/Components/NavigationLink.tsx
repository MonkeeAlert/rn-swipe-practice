import {accelerometer} from 'react-native-sensors';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {defaultBorderRadius} from '../../../utils/constants';
import {useTheme} from '../../../utils/hooks';
import Title from '../../../components/Title';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import Background from './Background';
import {BackgroundImage} from '../../../utils/types';

interface INavigationLink {
  title: string;
  route: string;
  delay: number;
  color?: string;
  routeOptions?: object;
  backgroundImage?: BackgroundImage;
}

interface IImageSize {
  width: number;
  height: number;
}

const HEIGHT = 150;
const DURATION = 500;

const NavigationLink = (props: INavigationLink) => {
  const {colors} = useTheme();
  const {navigate} = useNavigation();

  const [size, setSize] = useState<IImageSize>({width: 0, height: 0});

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  const aStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value - HEIGHT / 2}],
  }));

  useAnimatedReaction(
    () => {},
    () => {
      opacity.value = withDelay(
        props.delay,
        withTiming(1, {
          duration: DURATION,
        }),
      );

      translateY.value = withDelay(
        props.delay,
        withTiming(HEIGHT / 2, {
          duration: DURATION,
        }),
      );
    },
    [],
  );

  const theme = StyleSheet.create({
    container: {
      backgroundColor: props.color ?? colors.infoLight,
    },
  });

  // Redirection handler
  const handleRedirect = () => navigate(props.route, props.routeOptions);

  return (
    <Animated.View
      style={[styles.wrapper, aStyle]}
      renderToHardwareTextureAndroid={true}>
      <TouchableWithoutFeedback onPress={handleRedirect}>
        <View
          style={[styles.container, theme.container]}
          onLayout={e =>
            setSize({
              width: e.nativeEvent.layout.width,
              height: e.nativeEvent.layout.height,
            })
          }>
          <View style={styles.text}>
            <Title text={props.title} color={colors.white} />
          </View>

          {props.backgroundImage && (
            <Background
              image={props.backgroundImage}
              width={size.width + 50}
              height={size.height + 50}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default NavigationLink;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
  },
  container: {
    height: HEIGHT,
    borderRadius: defaultBorderRadius,
    marginVertical: 8,
    marginHorizontal: 15,
    position: 'relative',
    shadowColor: '#000',
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    position: 'absolute',
    bottom: 10,
    left: 15,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
  },
});
