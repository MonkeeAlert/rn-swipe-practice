import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {todoColors} from '../utils/constants';
import {useTheme} from '../utils/hooks';
import Circle from './Circle';
import {ModalWrapper} from './ModalWrapper';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onColorSet: (i: any) => void;
}

const CIRCLE_SIZE = 26;

const ModalColor = (props: IProps) => {
  const {styles} = useStyles();

  const handleSetColor = (i: any) => {
    if (props.onColorSet) {
      props.onColorSet(i);
    }
  };

  return (
    <ModalWrapper isVisible={props.isVisible} onClose={props.onClose}>
      <View style={styles.modalContainer}>
        {todoColors.map((i, k) => (
          <Pressable
            key={`Color_${k}`}
            onPress={() => handleSetColor(todoColors[k])}
            style={styles.colorButton}>
            <Circle size={CIRCLE_SIZE} color={i.color} />
            <Text style={styles.colorText}>{i.title}</Text>
          </Pressable>
        ))}
      </View>
    </ModalWrapper>
  );
};

export default ModalColor;

const useStyles = () => {
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    modalContainer: {
      paddingHorizontal: 22,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    colorButton: {
      width: '33.3333%',
      alignItems: 'center',
      marginVertical: 8,
    },
    colorText: {
      fontWeight: '500',
      fontSize: fonts.regular,
      color: colors.black,
      marginTop: 5,
      textAlign: 'center',
    },
  });

  return {styles};
};
