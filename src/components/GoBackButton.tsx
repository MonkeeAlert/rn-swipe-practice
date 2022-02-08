import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import {Icon} from 'react-native-elements';
import {useTheme} from '../utils/hooks';

interface IProps {
  size: number;
  color?: string;
  isAnimated?: boolean;
  onReturn?: () => void;
}

const SIZE = 32;

const GoBackButton = (props: IProps) => {
  const {goBack} = useNavigation();
  const {userTheme} = useTheme();

  const handleGoBack = () => {
    if (props.onReturn) {
      props.onReturn();
    }

    goBack();
  };

  return (
    <Pressable onPress={handleGoBack}>
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
