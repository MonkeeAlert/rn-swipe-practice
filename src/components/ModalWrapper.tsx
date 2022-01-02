import React, {ReactElement} from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import {defaultBorderRadius} from '../utils/constants';
import {useTheme} from '../utils/hooks';
import DefaultButton from './DefaultButton';

interface IProps {
  isVisible: boolean;
  children: ReactElement;
  onClose: () => void;
}

export const ModalWrapper = (props: IProps) => {
  const {styles} = useStyles();

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={props.isVisible}
      statusBarTranslucent={true}
      style={styles.container}
      onRequestClose={props.onClose}>
      <View style={styles.wrapper}>
        <View style={styles.inner}>
          <View>{props.children}</View>

          <View style={styles.closeButton}>
            <DefaultButton text={'Close'} onPress={props.onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const useStyles = () => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,.75)',
      justifyContent: 'center',
    },
    inner: {
      backgroundColor: colors.white,
      marginHorizontal: 50,
      marginVertical: 100,
      borderRadius: defaultBorderRadius,
      paddingTop: 22,
    },
    closeButton: {
      marginVertical: 22,
      marginHorizontal: 22,
    },
  });

  return {styles};
};
