import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native-elements';
import {BackgroundImage} from '../../../utils/types';

interface IProps {
  image: BackgroundImage;
  width: number;
  height: number;
}

const Background = (props: IProps) => {
  return (
    <View style={styles.container} pointerEvents={'none'}>
      <Image
        resizeMode={'repeat'}
        source={{uri: props.image}}
        style={{
          width: props.width ?? 100,
          height: props.height ?? 100,
        }}
      />
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    opacity: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
