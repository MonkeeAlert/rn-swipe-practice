import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useTheme} from '../../../utils/hooks';
import {getModerateScale} from '../../../utils/Scaling';
import {useHeaderHeight} from '@react-navigation/elements';

export const EmptyList = () => {
  const headerHeight = useHeaderHeight();
  const {colors, fonts} = useTheme();

  const theme = StyleSheet.create({
    text: {
      color: colors.darkGrey,
      fontSize: fonts.medium,
    },
    container: {
      width: Dimensions.get('window').width,
      height:
        Dimensions.get('window').height - getModerateScale(45) - headerHeight,
    },
  });

  return (
    <View style={[styles.container, theme.container]}>
      <View style={styles.icon}>
        <Icon
          name={'done-all'}
          type={'material'}
          color={colors.darkGrey}
          size={getModerateScale(48)}
        />
      </View>
      <Text style={[styles.text, theme.text]}>List is empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: 18,
  },
  text: {
    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
  },
});
