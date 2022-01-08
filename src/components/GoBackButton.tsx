import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../utils/constants';

interface IProps {
  size: number;
  color?: string;
}

const SIZE = 32;

const GoBackButton = (props: IProps) => {
  const {goBack} = useNavigation();

  return (
    <Pressable onPress={goBack}>
      <Icon
        name={'chevron-left'}
        type={'material'}
        size={props.size ?? SIZE}
        color={props.color ?? colors.black}
      />
    </Pressable>
  );
};

export default GoBackButton;
