import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {defaultBorderRadius} from '../../../utils/constants';
import {useTheme} from '../../../utils/hooks';
import {getModerateScale} from '../../../utils/Scaling';
import {ITodoCategory} from '../../../utils/types';

interface IProps {
  data: ITodoCategory[];
}

export const CategoriesBar = (props: IProps) => {
  const {styles} = useStyles();

  return (
    <View style={styles.container}>
      {props.data.map((i, k) => (
        <TouchableHighlight key={`Category_${i.title}_${k}`}>
          <View style={[styles.category, {borderColor: i.color}]}>
            <Text style={[styles.text, {color: i.color}]}>{i.title}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};

const useStyles = () => {
  const {fonts} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    category: {
      borderWidth: 1,
      borderRadius: defaultBorderRadius,
      paddingHorizontal: getModerateScale(12),
      paddingVertical: getModerateScale(6),
      marginRight: getModerateScale(10),
      marginVertical: getModerateScale(6),
    },
    text: {
      fontSize: fonts.regular,
      fontWeight: '500',
    },
  });

  return {styles};
};
