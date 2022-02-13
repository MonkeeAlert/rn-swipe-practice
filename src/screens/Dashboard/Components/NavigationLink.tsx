import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ColorValue,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
  color?: ColorValue;
  routeOptions?: object;
  backgroundImage?: BackgroundImage | string;
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

  // Redirection handler
  const handleRedirect = () => navigate(props.route, props.routeOptions);

  return (
    <Animated.View
      style={[styles.wrapper, aStyle]}
      renderToHardwareTextureAndroid={true}>
      <TouchableWithoutFeedback onPress={handleRedirect}>
        <View
          style={[
            styles.container,
            {backgroundColor: props.color ?? colors.infoLight},
          ]}
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
              width={size.width}
              height={size.height}
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
});
