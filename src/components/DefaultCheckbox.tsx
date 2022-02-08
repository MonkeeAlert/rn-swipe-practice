import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  ColorValue,
} from 'react-native';
import {useTheme} from '../utils/hooks';
import {getModerateScale} from '../utils/Scaling';

interface IProps {
  title?: string;
  isActive: boolean;
  color?: ColorValue;
  onToggle: () => void;
}

const CIRCLE_SIZE = 26;
const ELEMENT_HEIGHT = CIRCLE_SIZE + 4;

export default function DefaultCheckbox(props: IProps) {
  const {styles, colors} = useStyles();
  const [isActive, setActive] = useState(props.isActive ?? false);
  const animationRef = useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    if (!props.onToggle) {
      return;
    } else {
      setActive(prev => !prev);
      props.onToggle();
    }
  };

  const colorInterpolation = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.darkGrey, colors.successLight],
  });

  useEffect(() => {
    Animated.spring(animationRef, {
      toValue: +isActive,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  return (
    <View style={styles.container}>
      {props.title && (
        <Text style={[styles.title, props.color ? {color: props.color} : null]}>
          {props.title}
        </Text>
      )}

      <Pressable onPress={handleToggle}>
        <Animated.View
          style={[
            styles.togglerWrapper,
            {
              backgroundColor: colorInterpolation,
              borderColor: colorInterpolation,
            },
          ]}>
          <Animated.View
            style={[
              styles.togglerCircle,
              {
                transform: [
                  {
                    translateX: animationRef.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        0,
                        getModerateScale(
                          ELEMENT_HEIGHT * 1.75 - ELEMENT_HEIGHT,
                        ),
                      ],
                    }),
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const useStyles = () => {
  const {colors, fonts, userTheme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontWeight: '500',
      fontSize: fonts.medium,
      color: userTheme.text,
    },
    togglerWrapper: {
      width: getModerateScale(ELEMENT_HEIGHT * 1.75),
      height: getModerateScale(ELEMENT_HEIGHT),
      borderWidth: 1,
      borderColor: colors.grey,
      borderRadius: getModerateScale(ELEMENT_HEIGHT),
      justifyContent: 'center',
      paddingHorizontal: 1,
      paddingVertical: 1,
    },
    togglerCircle: {
      width: getModerateScale(CIRCLE_SIZE),
      height: getModerateScale(CIRCLE_SIZE),
      borderRadius: CIRCLE_SIZE,
      backgroundColor: colors.white,
    },
  });

  return {styles, colors, userTheme};
};
