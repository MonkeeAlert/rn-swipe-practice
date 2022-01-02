import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Circle from '../../../components/Circle';
import {defaultBorderRadius} from '../../../utils/constants';
import {useTheme} from '../../../utils/hooks';
import {getModerateScale} from '../../../utils/Scaling';

interface IProps {
  data: string[];
}

export const CategoriesBar = (props: IProps) => {
  const {styles} = useStyles();

  return (
    <View style={styles.container}>
      {props.data.map((i, k) => (
        <View style={styles.wrapper} key={`Category_${i}_${k}`}>
          <TouchableHighlight>
            <Circle size={28} color={i} />
          </TouchableHighlight>
        </View>
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
      justifyContent: 'center',
    },
    category: {
      borderWidth: 1,
      borderRadius: defaultBorderRadius,
      paddingHorizontal: getModerateScale(12),
      paddingVertical: getModerateScale(6),
      marginRight: getModerateScale(10),
      marginVertical: getModerateScale(6),
    },
    wrapper: {
      marginHorizontal: 5,
    },
    text: {
      fontSize: fonts.regular,
      fontWeight: '500',
    },
  });

  return {styles};
};
