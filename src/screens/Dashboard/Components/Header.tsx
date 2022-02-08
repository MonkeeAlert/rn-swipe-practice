import {View, StyleSheet, Platform} from 'react-native';
import React from 'react';
import Title from '../../../components/Title';
import AnimatedIcon from '../../../components/AnimatedIcon';
import {navigate} from '../../../navigation/RootNavigation';
import {useTheme} from '../../../utils/hooks';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const Header = () => {
  const {styles, userTheme} = useStyles();

  const goToSettings = () => navigate('Settings');

  const opacity = useSharedValue(0);
  const translationY = useSharedValue(0);

  const aStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateY: translationY.value - 50}],
    };
  });

  useAnimatedReaction(
    () => {},
    () => {
      opacity.value = withTiming(1, {
        duration: 500,
      });
      translationY.value = withTiming(50, {
        duration: 500,
      });
    },
    [],
  );

  return (
    <Animated.View style={[styles.header, aStyles]}>
      <Title text={'Trainings'} size={28} />
      <View style={styles.icons}>
        <View style={styles.icon}>
          <AnimatedIcon
            size={28}
            color={userTheme.text}
            name={'settings-sharp'}
            type={'ionicon'}
            onPress={goToSettings}
            duration={1000}
            delay={3000}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const useStyles = () => {
  const {userTheme} = useTheme();

  const styles = StyleSheet.create({
    header: {
      marginTop: Platform.OS === 'android' ? 50 : 100,
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    icons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginLeft: 10,
    },
  });

  return {styles, userTheme};
};
