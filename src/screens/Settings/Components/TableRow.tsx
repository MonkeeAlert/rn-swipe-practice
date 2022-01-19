import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../utils/hooks';

interface IProps {
  title: string;
  value: string | number;
  color?: string;
}

const TableRow = (props: IProps) => {
  const {styles, colors} = useStyles();

  return (
    <View style={styles.row}>
      <Text style={styles.title}>{props.title}</Text>
      <View
        style={[
          styles.valueContainer,
          {backgroundColor: props.color ?? colors.infoMain},
        ]}>
        <Text style={[styles.title, styles.value]}>{props.value}</Text>
      </View>
    </View>
  );
};

export default TableRow;

const useStyles = () => {
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 7,
    },
    title: {
      fontSize: fonts.regular,
      fontWeight: '700',
      color: colors.darkGrey,
    },
    value: {
      color: colors.white,
    },
    valueContainer: {
      borderRadius: 999,
      padding: 5,
      minWidth: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return {styles, fonts, colors};
};
