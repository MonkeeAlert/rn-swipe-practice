import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {Icon} from 'react-native-elements';
import {defaultAnimationTiming} from '../../../utils/constants';
import {useTheme} from '../../../utils/hooks';
import {getModerateScale} from '../../../utils/Scaling';

export const EmptyList = () => {
  const {styles, colors} = useStyles();

  const animationRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationRef, {
      toValue: 1,
      duration: defaultAnimationTiming,
      useNativeDriver: false,
    }).start();
  }, [animationRef]);

  return (
    <Animated.View
      style={[
        {
          opacity: animationRef.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: animationRef.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      ]}>
      <View style={styles.icon}>
        <Icon
          name={'done-all'}
          type={'material'}
          color={colors.darkGrey}
          size={getModerateScale(48)}
        />
      </View>
      <Text style={styles.text}>List is empty</Text>
    </Animated.View>
  );
};

const useStyles = () => {
  const {colors, fonts} = useTheme();
  const styles = StyleSheet.create({
    icon: {
      marginBottom: 18,
    },
    text: {
      textAlign: 'center',
      color: colors.darkGrey,
      fontSize: fonts.medium,
    },
  });

  return {styles, colors};
};
