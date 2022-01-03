import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../utils/constants';
import {useTheme} from '../utils/hooks';

interface IProps {
  size: number;
  color: string;
  isSelected?: boolean;
}

const Circle = (props: IProps) => {
  const {styles} = useStyles(props.size);

  return (
    <View
      style={[
        styles.circle,
        props.color === 'transparent' ? styles.circleBorder : null,
        {backgroundColor: props.color ?? 'red'},
      ]}>
      {props.isSelected ? (
        <Icon
          type={'ionicon'}
          name={'checkmark-sharp'}
          size={18}
          color={props.color === 'transparent' ? colors.grey : colors.white}
        />
      ) : null}
    </View>
  );
};

export default Circle;

const useStyles = (size: number) => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    circle: {
      width: size ?? 16,
      height: size ?? 16,
      borderRadius: size ?? 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circleBorder: {
      borderWidth: 2,
      borderColor: colors.grey,
    },
  });

  return {styles};
};
