import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableHighlight, View} from 'react-native';
import Circle from '../../../components/Circle';
import {defaultBorderRadius} from '../../../utils/constants';
import {useTheme} from '../../../utils/hooks';
import {getModerateScale} from '../../../utils/Scaling';

interface IProps {
  data: string[];
  onSelect: (item: any) => void;
}

export const CategoriesBar = (props: IProps) => {
  const {styles} = useStyles();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const animationRef = useRef(new Animated.Value(0)).current;

  const handleSelect = (c: string) => {
    let arr = JSON.parse(JSON.stringify(selectedColors));
    const exists = arr.includes(c);

    exists ? arr.splice(arr.indexOf(c), 1) : arr.push(c);

    setSelectedColors(arr);
    if (props.onSelect) {
      props.onSelect(arr);
    }
  };

  useEffect(() => {
    Animated.spring(animationRef, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }, []);

  const animation = {
    transform: [
      {
        translateY: animationRef.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
    opacity: animationRef.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <View style={styles.container}>
      {props.data.map((i: string, k) => (
        <Animated.View
          style={[styles.wrapper, animation]}
          key={`Category_${i}_${k}`}>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => handleSelect(i)}>
            <Circle
              size={28}
              color={i}
              isSelected={selectedColors.includes(i)}
            />
          </TouchableHighlight>
        </Animated.View>
      ))}
    </View>
  );
};

const useStyles = () => {
  const {fonts} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    category: {
      borderWidth: 1,
      borderRadius: defaultBorderRadius,
      paddingHorizontal: getModerateScale(12),
      paddingVertical: getModerateScale(6),
      marginRight: getModerateScale(10),
      marginVertical: getModerateScale(6),
    },
    wrapper: {
      marginHorizontal: 5,
    },
    text: {
      fontSize: fonts.regular,
      fontWeight: '500',
    },
  });

  return {styles};
};
