import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import {Icon} from 'react-native-elements';
import {useTheme} from '../utils/hooks';

interface IProps {
  size: number;
  color?: string;
}

const SIZE = 32;

const GoBackButton = (props: IProps) => {
  const {goBack} = useNavigation();
  const {userTheme} = useTheme();

  return (
    <Pressable onPress={goBack}>
      <Icon
        name={'chevron-left'}
        type={'material'}
        size={props.size ?? SIZE}
        color={props.color ?? userTheme.text}
      />
    </Pressable>
  );
};

export default GoBackButton;
