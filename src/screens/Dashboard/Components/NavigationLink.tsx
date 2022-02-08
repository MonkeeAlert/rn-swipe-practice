import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {defaultBorderRadius} from '../../../utils/constants';
import {useTheme} from '../../../utils/hooks';
import Title from '../../../components/Title';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface INavigationLink {
  title: string;
  route: string;
  delay: number;
  color?: string;
  routeOptions?: object;
}

const HEIGHT = 150;
const DURATION = 500;

const NavigationLink = (props: INavigationLink) => {
  const {colors} = useTheme();
  const {navigate} = useNavigation();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  const aStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value - HEIGHT / 2}],
  }));

  useAnimatedReaction(
    () => {},
    () => {
      // withSequence
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
    <Animated.View style={[styles.wrapper, aStyle]}>
      <TouchableWithoutFeedback onPress={handleRedirect}>
        <View style={[styles.container, theme.container]}>
          <View style={styles.text}>
            <Title text={props.title} color={colors.white} />
          </View>
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
    width: '100%',
    height: HEIGHT,
    borderRadius: defaultBorderRadius,
    marginVertical: 8,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 9.51,

    elevation: 10,
  },
  text: {
    position: 'absolute',
    bottom: 10,
    left: 15,
  },
});
