import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../utils/hooks';

interface ICategory {
  title: string;
  onPress: () => any;
}

export const ListCategory = (props: ICategory) => {
  const {colors} = useTheme();
  const theme = StyleSheet.create({
    wrapper: {
      borderColor: colors.infoMain,
    },
    text: {
      color: colors.infoMain,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.wrapper, theme.wrapper]}>
          <Text style={theme.text}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
  },
  wrapper: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
