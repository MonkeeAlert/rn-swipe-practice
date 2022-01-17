import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../utils/hooks';
import {getModerateScale} from '../utils/Scaling';

interface IProps {
  buttons: string[];
  keyExtractor: string;
  selectedIndex: number;
  numberOfItems?: number[];
  containerStyle?: StyleProp<ViewStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: (index: number) => void;
}

const CIRCLE_SIZE = 28;

const DefaultButtonGroup = (props: IProps) => {
  const {styles} = useStyles();

  return (
    <SafeAreaView style={[styles.container, props.containerStyle]}>
      {props.buttons?.map((category: string, key: number) => (
        <Pressable
          onPress={() => props.onPress(key)}
          key={`${props.keyExtractor ?? 'Pressable'}_${key}`}
          style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text
              style={[
                props.textStyle,
                props.selectedIndex === key ? props.selectedTextStyle : null,
              ]}>
              {category}
            </Text>
            {props.numberOfItems && props.numberOfItems[key] > 0 ? (
              <View style={styles.circle}>
                <Text style={styles.circleText}>
                  {props.numberOfItems[key] < 100
                    ? props.numberOfItems[key]
                    : '+99'}
                </Text>
              </View>
            ) : null}
          </View>
        </Pressable>
      ))}
    </SafeAreaView>
  );
};

export default DefaultButtonGroup;

const useStyles = () => {
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: getModerateScale(45),
    },
    buttonContainer: {
      flex: 1,
    },
    circle: {
      backgroundColor: colors.error,
      minWidth: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: CIRCLE_SIZE / 4,
    },
    circleText: {
      color: colors.white,
      fontSize: fonts.small,
      fontWeight: '700',
    },
  });

  return {styles};
};
