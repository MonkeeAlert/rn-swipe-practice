import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';

interface IHeaderIcon {
  name: string;
  type: 'material' | 'ionicon';
  onPress: () => any;
}

export const HeaderIcon = (props: IHeaderIcon) => {
  return (
    <Icon
      name={props.name}
      type={props.type}
      onPress={props.onPress}
      containerStyle={style.container}
      size={26}
    />
  );
};

const style = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
});
