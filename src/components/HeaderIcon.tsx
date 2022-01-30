import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useTheme} from '../utils/hooks';

interface IHeaderIcon {
  name: string;
  type: 'material' | 'ionicon';
  onPress: () => any;
}

export const HeaderIcon = (props: IHeaderIcon) => {
  const {userTheme} = useTheme();

  return (
    <Icon
      name={props.name}
      type={props.type}
      onPress={props.onPress}
      containerStyle={style.container}
      color={userTheme.text}
      size={26}
    />
  );
};

const style = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
});
