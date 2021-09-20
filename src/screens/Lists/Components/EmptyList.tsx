import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useTheme} from '../../../assets/hooks';

export const EmptyList = () => {
  const {colors} = useTheme();

  const theme = StyleSheet.create({
    text: {
      color: colors.darkGrey,
      fontSize: 21,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon
          name={'done-all'}
          type={'material'}
          color={colors.darkGrey}
          size={48}
        />
      </View>
      <Text style={[styles.text, theme.text]}>List is empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  icon: {
    marginBottom: 18,
  },
  text: {
    textAlign: 'center',
  },
});
